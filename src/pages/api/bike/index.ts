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
  defaultLimit: 24,

  // the maximum limit accepted by the API; if someone passes a limit greater
  // than this value then the limit will be this value
  // (defaults to 50)
  maxLimit: 50,
})(async (req, res) => {
  if (req.method === 'GET') {
    const { s, f, fType, l, p } = req.query;

    const sParam = s ? (s as string) : undefined;
    const fParam = f ? (f as any) : undefined;
    let orderBy = undefined;

    if (fParam) {
      if (fType && fType == 'price') {
        orderBy = [{ price: fParam }];
      } else {
        orderBy = [{ brand: fParam }];
      }
    }

    const bikes = await prisma.bike.findMany({
      take: Number(l),
      where: {
        location: {
          contains: sParam,
        },
      },
      orderBy: orderBy,
    });
    res.status(200).json(bikes);
  } else {
    res.send(500);
  }
});
