import { getSession } from "next-auth/react"
import dbConnect from '../../../lib/dbConnect';
import Rooms from "../../../models/rooms";



export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session)
  {
    res.status('401').send("Unauthorized");
    return
  }

  try {
    await dbConnect()
    const email = await req.query.email;
    const room = await Rooms.find({ 'participants': email }).populate('participants');
    console.log(room);
    res.json(room);
  }

  catch (error) {
    console.log("Rooms ",error);
    res.status('500');
    }
}