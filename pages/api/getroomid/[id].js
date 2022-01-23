import { getSession } from "next-auth/react";
import dbConnect from "../../../lib/dbConnect";
import Rooms from "../../../models/rooms";
import Users from "../../../models/users";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status("401").send("Unauthorized");
    return;
  }

  try {
    await dbConnect();
    console.log("\n \n \n");
    console.log(req.query);
    //Finfing Existing Room
    const room = await Rooms.find({
      $and: [{ participants: user1.email }, { participants: user2.email }],
    });

    //if no room found, then create one
    if (room.length == 0) {
      const newRoom = new Rooms({
        participants: [user1.email, user2.email],
        createdBy: user2.email,
      });
      newRoom.save();
      res.json(newRoom);
    } else {
      res.json(room);
    }
  } catch (error) {
    console.log(error);
    res.status("500");
  }
}
