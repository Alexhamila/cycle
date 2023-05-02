/* eslint-disable import/no-anonymous-default-export */
import prisma from '../../../lib/prisma';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '12mb', // Set desired value here
    },
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const bike = await prisma.bike.create({
      data: req.body,
    });
    return res.status(200).json(bike);
  } else {
    res.setHeader('Allow', ['POST']);
    return res.send(500);
  }
};
