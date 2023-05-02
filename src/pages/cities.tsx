import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { place } from '@/constant/characteristics';

export default function Mainpage() {
  return (
    <Layout>
      <Seo templateTitle='Bike categories' />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center py-2'>
            <div className=''>
              <div className='layout py-8'>
                <div className=''>
                  <h2 className='text-5sxl'>Cities</h2>
                  <p>
                    Browse all available bikes in your city. We are constantly
                    adding new cities to our catalog. But please let us know if
                    yours is not yet there !
                  </p>
                </div>
                <div className='my-8 grid grid-cols-1 gap-y-6 gap-x-4'>
                  {place.map((place) => (
                    <a
                      href={`/buy?s=${place.name}`}
                      key={place.id}
                      className='group relative w-full cursor-pointer rounded-lg'
                    >
                      <div
                        className='absolute h-full w-full rounded-lg'
                        style={{
                          backgroundImage: 'url("' + place.image + '")',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div className='absolute h-full w-full rounded-lg bg-gradient-to-r from-gray-900 to-gray-600 opacity-60 transition-all delay-75 ease-in-out group-hover:opacity-90' />

                      <div className='my-24 mx-8 flex w-full rounded-lg'>
                        <p className='z-50 mx-2 py-2 text-2xl font-bold lowercase text-white first-letter:capitalize'>
                          {place.name}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
