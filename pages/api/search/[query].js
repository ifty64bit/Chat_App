import { getSession } from "next-auth/react"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session)
    {
      res.status('401').send("Unauthorized");
      return
    }
    console.log(req.query);
    try {
      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: req.query.query
          },
        },
      })
      res.json(users);
    } catch (error) {
      console.log(error);
    }
    
  }