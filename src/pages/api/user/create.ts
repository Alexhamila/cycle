import type { NextApiRequest, NextApiResponse } from 'next';

import { hashPassword } from '@/lib/auth/passwords';

import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await handlePOST(res, req);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// POST /api/user
// @ts-ignore
async function handlePOST(res, req) {
  await prisma.user
    .create({
      data: { ...req.body, password: await hashPassword(req.body.password) },
    })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json('An error occured');
    });
}
