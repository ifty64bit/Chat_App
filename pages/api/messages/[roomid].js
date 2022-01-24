import Users from "../../../models/users";
import Messages from "../../../models/messages";
import { getSession } from "next-auth/react";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) {
        res.status("401").send("Unauthorized");
        return;
    }
    
    try {
        await dbConnect();
        const id = await req.query.roomid;
        let messages = await Messages.find({ roomID: id }).populate({ path: 'sender', model: Users });
        res.json(messages)
    } catch (error) {
        console.log("Message => [roomid]",error);
        res.status("500");
    }
}