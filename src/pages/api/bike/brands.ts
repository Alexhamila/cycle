import { withPagination } from 'next-api-paginate';

import prisma from '../../../lib/prisma';

export default withPagination({
  // the name of the query parameter used for indicating the current page
  // (defaults to "page")
  pageQueryParam: 'p',

  // the name of the query parameter used for indicating the entry limit
  // (defaults to "limit")
  limitQueryParam: 'l',

  // the default limit (when a `limit` is not provided)
  // (defaults to 10)
  defaultLimit: 10,

  // the maximum limit accepted by the API; if someone passes a limit greater
  // than this value then the limit will be this value
  // (defaults to 50)
  maxLimit: 50,
})(async (req, res) => {
  if (req.method === 'GET') {
    const { s, l, p } = req.query;

    const sParam = s ? (s as string) : '';

    const brands = await prisma.brand.findMany({
      take: Number(l),
      where: {
        name: {
          contains: sParam,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    res.status(200).json(brands);
  } else {
    res.send(500);
  }
});
