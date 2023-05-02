import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import * as React from 'react';

import { useAuth } from '@/lib/auth/useAuth';
import WithAuth from '@/lib/auth/WithAuth';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Skeleton from '@/components/Skeleton';

const profile = {
  name: 'Ricardo Cooper',
  email: 'ricardo.cooper@example.com',
  avatar:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  backgroundImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  fields: [
    ['Phone', '(555) 123-4567'],
    ['Email', 'ricardocooper@example.com'],
    ['Title', 'Senior Front-End Developer'],
    ['Team', 'Product Development'],
    ['Location', 'San Francisco'],
    ['Sits', 'Oasis, 4th floor'],
    ['Salary', '$145,000'],
    ['Birthday', 'June 8, 1990'],
  ],
};

export default function Mainpage() {
  const { user, isSignedIn, isLoading } = useAuth();

  return (
    <WithAuth>
      <Layout>
        <Seo templateTitle='Sell' />
        <main>
          <img
            className='h-32 w-full object-cover lg:h-48'
            src='/images/background.webp'
            alt=''
          />
          <section className='layout bg-white'>
            <div>
              <div className=''>
                <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
                  <div className='flex'>
                    <img
                      className='h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                      src='/images/placeholder.jpeg'
                      alt=''
                    />
                  </div>
                  <div className='mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                    <div className='mt-6 min-w-0 flex-1 sm:hidden md:block'>
                      <h1 className='truncate text-2xl font-bold text-gray-900'>
                        {isLoading ? <Skeleton /> : user?.email}
                      </h1>
                    </div>
                    <div className='justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
                      >
                        <EnvelopeIcon
                          className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span>Message</span>
                      </button>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
                      >
                        <PhoneIcon
                          className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span>Call</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className='mt-6 hidden min-w-0 flex-1 sm:block md:hidden'>
                  <h1 className='truncate text-2xl font-bold text-gray-900'>
                    {isLoading ? <Skeleton /> : user?.email}
                  </h1>
                </div>
              </div>
            </div>

            <div className=' flex flex-col justify-center py-12'>
              <h1 className='my-2 text-2xl font-semibold'>Your listings</h1>
              <p className='text-md font-light'>
                Click on the incomplete listing to modify it
              </p>
            </div>

            <div className='grid grid-cols-1 gap-y-4 pb-12'>
              <div className='relative mb-4 flex items-center justify-start rounded-2xl border-t border-gray-100 bg-white p-6 shadow-lg'>
                <div className='h-full w-40 rounded-lg bg-gray-200'></div>

                <div className='h-fit w-fit pl-8 text-gray-800'>
                  <div className='text-md'>Cannondale</div>
                  <div className='mt-2 text-sm font-light text-gray-600'>
                    5 minutes ago | no price
                  </div>
                  <div className='mt-4 flex'>
                    <div className='mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='21.37'
                        height='23.544'
                        viewBox='0 0 21.37 23.544'
                        className='scale-75 transform'
                      >
                        <path
                          id='Path_6076'
                          data-name='Path 6076'
                          d='M4707.252-2045.457a3.082,3.082,0,0,1-3.078-3.078v-14.308h-1.269a.9.9,0,0,1-.9-.905.9.9,0,0,1,.9-.906h4.528v-1.268a3.056,3.056,0,0,1,.9-2.176,3.059,3.059,0,0,1,2.177-.9h4.347a3.083,3.083,0,0,1,3.079,3.078v1.268h4.527a.905.905,0,0,1,.906.906.905.905,0,0,1-.906.905H4721.2v14.308a3.082,3.082,0,0,1-3.079,3.078Zm-1.268-3.078a1.27,1.27,0,0,0,1.268,1.268h10.866a1.27,1.27,0,0,0,1.268-1.268v-14.308h-13.4Zm10.142-16.119v-1.268a1.269,1.269,0,0,0-1.267-1.267h-4.347a1.26,1.26,0,0,0-.9.371,1.259,1.259,0,0,0-.372.9v1.268Zm-2.173,12.858v-6.52a.905.905,0,0,1,.906-.906.905.905,0,0,1,.9.906v6.52a.906.906,0,0,1-.9.906A.906.906,0,0,1,4713.953-2051.8Zm-4.347,0v-6.52a.905.905,0,0,1,.905-.906.905.905,0,0,1,.905.906v6.52a.906.906,0,0,1-.905.906A.906.906,0,0,1,4709.606-2051.8Z'
                          transform='translate(-4702 2069)'
                          fill='currentColor'
                        ></path>
                      </svg>
                    </div>
                    <div className='mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='19.037'
                        height='18.205'
                        viewBox='0 0 19.037 18.205'
                        className='scale-75 transform'
                      >
                        <path
                          id='Path_351'
                          data-name='Path 351'
                          d='M-606.714-7712.59a1,1,0,0,1-.264-.949l.947-3.785a1.007,1.007,0,0,1,.264-.465l11.831-11.831a2.991,2.991,0,0,1,2.126-.88,3,3,0,0,1,2.126.88,3.014,3.014,0,0,1,0,4.255l-11.831,11.831a.99.99,0,0,1-.464.262l-3.787.947a1,1,0,0,1-.243.03A.993.993,0,0,1-606.714-7712.59Zm14.192-15.616-11.635,11.635-.475,1.9,1.9-.476,11.635-11.635a1.008,1.008,0,0,0,0-1.426,1,1,0,0,0-.712-.295A1,1,0,0,0-592.522-7728.206Zm-4.967,15.909a1,1,0,0,1-1-1,1,1,0,0,1,1-1h8.517a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z'
                          transform='translate(607.008 7730.5)'
                          fill='currentColor'
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className='absolute top-4 right-2'>
                  <div>
                    <div className='rounded-2xl bg-red-200 py-2 px-4 text-sm'>
                      Draft
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-center  pb-12'>
              <button className='rounded-lg border border-white bg-black py-4 px-8 font-bold text-white hover:border-black hover:bg-white hover:text-black'>
                Add another bike
              </button>
            </div>
          </section>
        </main>
      </Layout>
    </WithAuth>
  );
}
