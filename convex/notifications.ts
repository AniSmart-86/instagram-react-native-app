import { query } from "./_generated/server";
import { getUser } from "./users";




export const getNotification = query({
    handler: async (ctx)=>{
        const currentUser = await getUser(ctx);

        // get all posts
        const notifications = await ctx.db.query("notifications").withIndex("by_receiver", (q)=>q.eq("receiverId", currentUser._id)).order("desc").collect();
     



        // userData and interactions
        const notificationsWithInfo = await Promise.all(
            notifications.map(async (notification)=>{
                const sender = (await ctx.db.get(notification.senderId))!;

            let post = null;
            let comment = null;

            if(notification.postId){
                post = await ctx.db.get(notification.postId)
            }

            if(notification.type === "comment" && notification.commentId){
                comment = await ctx.db.get(notification.commentId)
            }


            return {
                ...notification,
                sender:{
                    _id: sender?._id,
                    fullname: sender?.fullname ?? "Unknown User",
                    image: sender?.image ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", // Default image if not set
                },
                post,
                comment: comment?.content,
            };

            })
        );
        return notificationsWithInfo;
    }
});

