import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { categories } from '@/constant/characteristics';

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
                  <h2>Bike types</h2>
                  <p>
                    Browse all our available bike types, ranging from city bikes
                    to road bikes and even electric bicycles.
                  </p>
                </div>
                <div className='my-8 grid grid-cols-2 gap-y-6 gap-x-4'>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className='group relative w-full cursor-pointer rounded-lg'
                    >
                      <div
                        className='absolute h-full w-full rounded-lg'
                        style={{
                          backgroundImage: 'url("' + category.image + '")',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div className='absolute h-full w-full rounded-lg bg-gradient-to-r from-gray-900 to-gray-600 opacity-60 transition-all delay-75 ease-in-out group-hover:opacity-90' />

                      <div className='my-24 mx-8 flex w-full rounded-lg'>
                        <p className='z-50 mx-2 py-2 text-2xl font-bold capitalize text-white'>
                          {category.name}
                        </p>
                      </div>
                    </div>
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
