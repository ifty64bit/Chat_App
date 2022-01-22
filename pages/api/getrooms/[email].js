import { getSession } from "next-auth/react"
import dbConnect from '../../../lib/dbConnect';
import rooms from "../../../models/rooms";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session)
  {
    res.status('401').send("Unauthorized");
    return
  }
  
  try {
    await dbConnect()
    const email = req.query.email;
    const room = await rooms.find({ 'participants': email });
    console.log(room);
    res.json(room);
    }   catch (error) {
    console.log(error);
    res.status('500');
    }
}