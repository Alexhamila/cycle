import { NextApiRequest, NextApiResponse } from 'next';
import { useSession } from 'next-auth/react';

const withUserAuth =
  (handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await useSession();

    if (!session?.data?.user) return res.status(401).end('Unauthorized');

    if (req.method === 'GET') return handler(req, res, session);

    return handler(req, res, session);
  };

export { withUserAuth };
