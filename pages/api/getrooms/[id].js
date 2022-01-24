import { getSession } from "next-auth/react"
import dbConnect from '../../../lib/dbConnect';
import Rooms from "../../../models/rooms";
import Users from "../../../models/users";



export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session)
  {
    res.status('401').send("Unauthorized");
    return
  }

  try {
    await dbConnect()
    const id = await req.query.id;
    const room = await Rooms.find({ 'participants': id }).populate('participants');
    res.json(room);
  }

  catch (error) {
    console.log("Error From getRooms=>[id] ",error);
    res.status('500');
    }
}