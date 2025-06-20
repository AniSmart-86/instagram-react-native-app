import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";


export const generateUploadUrl = mutation(async (ctx)=>{
    const identity = await ctx.auth.getUserIdentity();
    if(!identity) throw new Error("unauthorized user");
    return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
    args:{
        caption: v.optional(v.string()),
        storageId: v.id("_storage")
    },

    handler: async (ctx,args)=>{
        const currentUser = await getUser(ctx);

            const imageUrl = await ctx.storage.getUrl(args.storageId);
            if(!imageUrl) throw new Error("Image not found");
            // create a post
           const postId = await ctx.db.insert("posts", {
                userId: currentUser._id,
                imageUrl,
                storageId: args.storageId,
                caption: args.caption,
                likes: 0,
                comments: 0,
            })

            // increment users posts
            await ctx.db.patch(currentUser._id, {
                posts: ( currentUser.posts || 0) + 1,
            });

          return { success: true, postId };

        },
});


export const getFeeds = query({
    handler: async (ctx)=>{
        const createUser = await getUser(ctx);

        // get all posts
        const posts = await ctx.db.query("posts").order("desc").collect();
        if(posts.length === 0) return [];



        // userData and interactions
        const postsWithInfo = await Promise.all(
            posts.map(async (post)=>{
                const postAuthor = (await ctx.db.get(post.userId))!;

               const like = await ctx.db.query("likes").withIndex("by_user_and_post", (q)=>q.eq("userId", createUser._id).eq("postId", post._id)).unique()
               const bookmark = await ctx.db.query("bookmarks").withIndex("by_user_and_post", (q)=>q.eq("userId", createUser._id).eq("postId", post._id)).unique()
           return {
            ...post,
            author:{
                _id: postAuthor?._id,
                fullname: postAuthor?.fullname ?? "Anonymous",
                image: postAuthor?.image ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            },
            isLiked: !!like,
            isBookmarked: !!bookmark
           }
            })
        );
        return postsWithInfo;
    }
});



export const toggleLikes = mutation({
    args:{
        postId: v.id("posts")
    },

    handler: async (ctx,args)=>{
        const currentUser = await getUser(ctx);

        const existing = await ctx.db.query("likes").withIndex("by_user_and_post", (q)=>q.eq("userId", currentUser._id).eq("postId", args.postId)).first();

        const post = await ctx.db.get(args.postId);
        if(!post) throw new Error("post not found");

        if(existing){
            // remove like
            await ctx.db.delete(existing._id);
            await ctx.db.patch(args.postId, {likes: post.likes - 1});
            return false;
        }else{
            // add like
            await ctx.db.insert("likes", {
                userId: currentUser._id,
                postId: args.postId,
            });
            await ctx.db.patch(args.postId, {likes: post.likes + 1});
        
            if(currentUser._id !== post.userId){
            // remove like
            await ctx.db.insert("notifications", {
                receiverId: post.userId,
                senderId: currentUser._id,
                type: "like",
                postId: args.postId
            });  
        }
        return true;
        }
    }
});





export const deletePost = mutation({
    args:{
        postId: v.id("posts")
    },

    handler: async (ctx,args)=>{
        const currentUser = await getUser(ctx);


        const post = await ctx.db.get(args.postId);
        if(!post) throw new Error("post not found");

        if(post.userId !== currentUser._id){
           throw new Error("Not authorized to delete this post");
            
        }

        const likes = await ctx.db.query("likes")
        .withIndex("by_post", (q)=> q.eq("postId", args.postId))
        .collect();

        for (const like of likes){
            await ctx.db.delete(like._id)
        }


        const comments = await ctx.db.query("comments")
        .withIndex("by_post", (q)=> q.eq("postId", args.postId))
        .collect();

        for (const comment of comments){
            await ctx.db.delete(comment._id)
        }


        const bookmarks = await ctx.db.query("bookmarks")
        .withIndex("by_post", (q)=> q.eq("postId", args.postId))
        .collect();

        for (const bookmark of bookmarks){
            await ctx.db.delete(bookmark._id)
        }


        const notifications = await ctx.db.query("notifications")
        .withIndex("by_post", (q)=> q.eq("postId", args.postId))
        .collect();

        for (const notification of notifications){
            await ctx.db.delete(notification._id)
        }

        await ctx.storage.delete(post.storageId)
        await ctx.db.delete(args.postId)

        await ctx.db.patch(currentUser._id, {
            posts: Math.max(0, (currentUser.posts || 1) - 1)
        });
    }
});






export const getPostByUser = query({
    args: {userId: v.optional(v.id("users"))},

    handler: async (ctx,args)=>{
        const user = args.userId ? await ctx.db.get(args.userId) : await getUser(ctx);

        if(!user) throw new Error("user not found");

        const posts = await ctx.db.query("posts")
        .withIndex("by_user", (q)=>q.eq("userId", args.userId || user._id))
        .collect();

        return posts;
    }
});



