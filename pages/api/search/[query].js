import { getSession } from "next-auth/react"
import dbConnect from '../../../lib/dbConnect';
import Users from "../../../models/users";

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session)
    {
      res.status('401').send("Unauthorized");
      return
    }
    console.log(req.query);
    try {
      await dbConnect()
      const name = await req.query.query;
      const users = await Users.find({ 'name': {$regex: name, $options: 'i'} });
      console.log(users);
      res.json(users);
    } catch (error) {
      console.log(error);
    }
    
  }