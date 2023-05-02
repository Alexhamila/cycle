import { signIn, useSession } from 'next-auth/react';

export type UseAuthReturnValue = {
  isLoading: boolean;
  isSignedIn: boolean;
  user?: {
    email?: string;
    image?: string;
  };
};

type Props = {
  /**
   * @default false
   */
  required?: boolean;
};

export const useAuth = (props?: Props): UseAuthReturnValue => {
  const required = props?.required ?? false;

  const session = useSession({
    required,
    onUnauthenticated(): void {
      signIn();
    },
  });

  return {
    isLoading: session.status === 'loading',
    isSignedIn: session.status === 'authenticated',
    user: session.data?.user,
  };
};
