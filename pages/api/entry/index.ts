import prisma from '../../../lib/prisma';
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await handlePost(req, res);
      break;
    case 'GET':
      await handleGet(req, res);
      break;
    default:
      res.status(400).json({ ERROR: 'BAD Request' });
      break;
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { value } = req.body;
  const result = await prisma.entry.create({
    data: {
      value
    }
  });
  res.json(result);
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const result = await prisma.entry.findMany();
  res.json(result);
}