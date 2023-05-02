import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function Mainpage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center py-24'>
            <div className='flex max-w-4xl flex-col'>
              <h1 className='leading-tighter col-span-2 mt-4 text-6xl font-bold'>
                Sorry still didn't have any time to write this out !{' '}
              </h1>
              <p>But don't worry it'll be up here soon 🤗</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
