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

  if (req.method === "POST") {
    try {
      await dbConnect();
      const { user1, user2 } = req.body; //destracturing object
      //Finfing Existing Room
      const room = await Rooms.find({
        $and: [{ participants: user1._id }, { participants: user2._id }],
      }).populate('participants');

      //if no room found, then create one
      if (room.length == 0) {
        const newRoom = new Rooms({
          participants: [user1._id, user2._id],
          createdBy: user2._id,
        });
        //below code will save room and populate user data
        await newRoom.save((err, r) => {
          r.populate('participants').
            then((_r) => {
              res.json(_r);
          })
        });
      } else {
        res.json(room);
      }
    } catch (error) {
      console.log("getRoomID => Index\n",error);
      res.status("500");
    }
  }
}
