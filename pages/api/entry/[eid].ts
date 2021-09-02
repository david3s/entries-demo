import prisma from '../../../lib/prisma';
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'DELETE':
      await handleDelete(req, res);
      break;
    default:
      res.status(400).json({ ERROR: 'BAD Request' });
      break;
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const {eid} = req.query;
  const result = await prisma.entry.delete({
    where: {
      id: parseInt(eid.toString())
    }
  });
  res.json(result);
}