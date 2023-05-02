import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiHandler, NextApiRequest } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';

import prisma from '../../../lib/prisma';

const options: NextAuthOptions = {
  debug: true,
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: 'credentials',
      name: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'alex@cycle.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-ignore
      authorize: async (credentials, req: NextApiRequest) => {
        const user = await fetch(
          `http://localhost:3000/api/user/check-credentials`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              accept: 'application/json',
            },
            //@ts-ignore
            body: Object.entries(credentials)
              .map((e) => e.join('='))
              .join('&'),
          }
        )
          .then((res) => {
            return res.json();
          })
          .catch((err) => {
            return null;
          });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // pages
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
