import { omit } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyPassword } from '@/lib/auth/passwords';

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
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      password: true,
    },
  });
  if (user) {
    const verifiedPass = await verifyPassword(req.body.password, user.password);
    if (verifiedPass) {
      const newUser = omit(user, 'password');
      return res.status(200).json(newUser);
    } else {
      return res.status(400).end('Invalid credentials');
    }
  } else {
    return res.status(400).end('Invalid credentials');
  }
}
