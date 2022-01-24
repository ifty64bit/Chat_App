import Rooms from "../../../models/rooms";
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
        const body = await req.body
        console.log(body);
        const newMessage = new Messages({
            text: body.text,
            img: body.img,
            roomID: body.roomID,
            sender: body.id
        });
        const data = await newMessage.save();
        res.json(data)
    } catch (error) {
        console.log("Message => index",error);
        res.status("500");
    }
}