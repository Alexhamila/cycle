import router from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Layout from '@/components/layout/Layout';

export interface WithAuthType {
  children: React.ReactNode;
  options?: any;
}

function WithAuth({ children, options }: WithAuthType) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    // Do nothing while loading
    if (status === 'loading') {
      return;
    }

    // If not authenticated, redirect to provided url or
    if (!isUser) {
      if (options?.redirectTo) {
        router.push(options.redirectTo);
      } else {
        signIn();
      }
    }
  }, [isUser, status]);

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <>
      {isUser ? (
        children
      ) : (
        <Layout>
          <div className='flex h-screen w-screen flex-col content-center items-center justify-center'>
            ...
          </div>
        </Layout>
      )}
    </>
  );
}

export default WithAuth;
