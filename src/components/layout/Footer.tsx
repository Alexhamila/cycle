import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

interface Props {
  className?: string;
  children?: any;
  pages?: any;
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Categories',
    url: '/categories',
  },
  {
    name: 'Cities',
    url: '/cities',
  },
  {
    name: 'Privacy Policy',
    url: '/privacy-policy',
  },
  {
    name: 'Login',
    url: '/login',
  },
  {
    name: 'Register',
    url: '/register',
  },
  {
    name: 'Buy a bike',
    url: '/search',
  },
  {
    name: 'Sell a bike',
    url: '/sell',
  },

  {
    name: 'Buy a bike in Montreal',
    url: '/buy?s=MONTREAL',
  },
  {
    name: 'Buy a bike in Laval',
    url: '/buy?s=LAVAL',
  },
  {
    name: 'Buy a bike in Longueuil',
    url: '/buy?s=LONGUEUIL',
  },
];

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages);

  return (
    <footer className='z-20 border border-t bg-gray-200/60'>
      <div className='layout'>
        <div className='text-primary bg-primary grid grid-cols-1 gap-8 border-b py-12 transition-colors duration-150 lg:grid-cols-12'>
          <div className='col-span-1 lg:col-span-2'>
            <Link
              href='/'
              className='flex flex-initial items-center font-bold md:mr-24'
            >
              <span className='border-accent-6 mr-2 rounded-full border'>
                <img
                  src='/images/logo.png'
                  className='max-w-8 mr-3 h-auto max-h-8'
                ></img>
              </span>
              <span>Cycle.com</span>
            </Link>
          </div>
          <div className='col-span-1 lg:col-span-7'>
            <div className='grid md:grid-flow-col md:grid-cols-3 md:grid-rows-4'>
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className='py-3 md:py-0 md:pb-4'>
                  <Link
                    href={page.url!}
                    className='text-accent-9 hover:text-accent-6 transition duration-150 ease-in-out'
                  >
                    {page.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <div className='text-primary col-span-1 flex items-start lg:col-span-3 lg:justify-end'>
            <div className='flex h-10 items-center space-x-4'></div>
          </div>
        </div>
        <div className='text-accent-6 flex flex-col items-center justify-between space-y-4 pt-6 pb-10 text-sm md:flex-row'>
          <div>
            <span>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
                Cycle.com
              </UnderlineLink>
              , Inc. All rights reserved.
            </span>
          </div>
          <div className='text-primary flex items-center text-sm'>
            <span className='text-primary'>Created by </span>
            <a href='https://cycle.com/' className='ml-2 flex items-center'>
              <img
                src='/images/logo.png'
                className='mr-3 h-6 sm:h-9'
                alt='Cycle ogo'
              />
              <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
                Cycle.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const getSlug = (path: string) => path.replace(/^\/|\/$/g, '');

function usePages(pages?: any[]) {
  const { locale } = useRouter();
  const sitePages: any[] = [];

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url);
      if (!slug) return;
      if (locale && !slug.startsWith(`${locale}/`)) return;
      sitePages.push(page);
    });
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  };
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: any, b: any) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0);
}

export default Footer;
