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
  
  try {
    const [email1, email2] = req.query.id.split("&");
    const room = await prisma.rooms.findMany({
      where: {
        participants: {
          hasEvery: [email1 , email2]
        },
      },
    })

    //console.log(room);

    if (room.length==0)
    {
      const newRoom = await prisma.rooms.create({   //outputs as array
        data: {
          participants: [email1, email2],
          createdBy: email2
        },
      });
      //console.log(newRoom);
      res.json(newRoom[0]);
    }
    else {
      res.json(room);
    }

  } catch (error) {
    console.log(error);
  }
}