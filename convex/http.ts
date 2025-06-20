import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";



const http = httpRouter();

http.route({
    path:"/smart-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const webhookScret = process.env.CLERK_WEBHOOK_SECRET;
        if(!webhookScret){
            throw new Error("Missing webhook secret");
        }

        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if(!svix_id || !svix_signature || !svix_timestamp){
            throw new Response("Missing svix headers", {status:400});
        }


        const payload = await request.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookScret);
        let evt:any;

        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp,
            }) as any;
            
        } catch (error) {
          console.log("Error verifying webhook", error);
            return new Response("Invalid signature", {status: 401});  
        }
    
        const eventType = evt.type;
        if(eventType === "users.created"){
            const { id, email_addresses, first_name, last_name, image_url } = evt.data;
        
            const email = email_addresses[0].email_address;
            const fullname = `${first_name || ""}.trim() ${last_name || ""}`.trim();
           

            try {
                await ctx.runMutation(api.users.createUser, {
                    username: email.split("@")[0],
                    fullname: fullname,
                    email,
                    image: image_url,
                    clerkId: id,
                });
            }catch (error) {
                console.log("Error creating user", error);
                return new Response("Error creating user", {status: 500});
            }
        }
        return new Response("webhook passed successfully", {status: 200});
    }),
});


export default http;