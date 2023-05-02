import Link from 'next/link';
import { signOut } from 'next-auth/react';
import * as React from 'react';

import { useAuth } from '@/lib/auth/useAuth';

import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/buy', label: 'buy a bike' },
  { href: '/sell', label: 'sell a bike' },
  { href: '/about', label: 'who are we ?' },
];

export default function Header() {
  const { isLoading, isSignedIn, user } = useAuth();

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <nav className='rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4'>
        <div className='layout mx-auto flex flex-wrap items-center justify-between'>
          <div className='flex gap-8'>
            <Link href='/' className='flex items-center'>
              <img
                src='/images/logo.png'
                className='mr-3 h-6 sm:h-9'
                alt='Cycle ogo'
              />
              <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
                Cycle.com
              </span>
            </Link>
            <div
              className='hidden w-full items-center justify-between md:order-1 md:flex md:w-auto'
              id='navbar-cta'
            >
              <ul className='md:text-md mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 tracking-wide dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0  md:bg-white md:font-medium md:dark:bg-gray-900'>
                {links.map(({ href, label }) => (
                  <li key={`${href}${label}`}>
                    <UnstyledLink
                      href={href}
                      className='block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-gray-900 md:dark:hover:bg-transparent md:dark:hover:text-white'
                    >
                      {label}
                    </UnstyledLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex md:order-2'>
            {!isSignedIn ? (
              <>
                <Link
                  href='/login'
                  className='mr-3 rounded-lg border border-white bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:border-black focus:outline-none focus:ring-4 focus:ring-black md:mr-0'
                >
                  Connect
                </Link>
                <Link
                  href='/register'
                  className='ml-3 rounded-lg border border-black bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:border-black hover:bg-white  hover:text-black focus:outline-none focus:ring-4 focus:ring-black  md:mr-0'
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/app'
                  className='mr-3 rounded-lg border border-white bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:border-black focus:outline-none focus:ring-4 focus:ring-black md:mr-0'
                >
                  My Listings
                </Link>
                <button
                  onClick={() => signOut()}
                  className='ml-3 rounded-lg border border-black bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:border-black hover:bg-white  hover:text-black focus:outline-none focus:ring-4 focus:ring-black  md:mr-0'
                >
                  Sign out
                </button>
              </>
            )}
            <button
              data-collapse-toggle='navbar-cta'
              type='button'
              className='inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
              aria-controls='navbar-cta'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='h-6 w-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
