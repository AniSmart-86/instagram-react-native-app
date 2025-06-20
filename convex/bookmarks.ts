import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";
import bookmarks from "@/app/(tabs)/bookmarks";

export const toggleBookMarks = mutation({
    args:{
        postId: v.id("posts")
    },

    handler: async (ctx,args)=>{
        const currentUser = await getUser(ctx);

        const existing = await ctx.db.query("bookmarks").withIndex("by_user_and_post", (q)=>q.eq("userId", currentUser._id).eq("postId", args.postId)).first();

        if(existing){
            // remove like
            await ctx.db.delete(existing._id);
            // await ctx.db.patch(args.postId, {likes: post.likes - 1});
            return false;
        }else{
            // add like
            await ctx.db.insert("bookmarks", {
                userId: currentUser._id,
                postId: args.postId,
            });
            return true;
        }
}
});


export const getBookmarks = query({
   
    handler: async (ctx)=>{
        const currentUser = await getUser(ctx);

        const bookmarks = await ctx.db.query("bookmarks").withIndex("by_user", (q)=>q.eq("userId", currentUser._id)).order("desc").collect();

        const bookmarksWithInfo = await Promise.all(
        bookmarks.map(async (bookmark)=>{
            const post = await ctx.db.get(bookmark.postId);
            return post;
        })
        )
        return bookmarksWithInfo;
}
});