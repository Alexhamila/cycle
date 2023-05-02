import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { categories, place } from '@/constant/characteristics';
import { Place } from '@/constant/types';

export default function Mainpage() {
  const [cities, setCities] = React.useState(place);
  const [selectedCity, setSelectedCity] = React.useState({
    name: '',
    id: '',
    province: '',
    image: '',
  });

  const doSearchCity = (e) => {
    fetch(`/api/cities?s=${e}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (b) => {
      const res = await b.json();
      setCities(res);
    });
  };

  return (
    <Layout>
      <Seo templateTitle='Home' />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center py-24'>
            <div className='grid grid-cols-3'>
              <h1 className='leading-tighter col-span-2 mt-4 text-6xl font-bold'>
                Buy your own used bike, easy to use and safe.
              </h1>
            </div>

            <div className='absolute right-10 z-0 col-span-1 flex items-center'>
              <img src='/images/cycle.png' className='h-[512px] w-[512px]' />
            </div>
            <div className='z-10 my-8 w-fit min-w-[512px] rounded-xl border-t border-gray-100 bg-white p-6 text-xl font-semibold shadow-lg'>
              <div className='my-4 flex flex-row justify-between gap-4 text-left text-gray-900'>
                <div className='relative w-full'>
                  <div className='flex w-full flex-col items-end'>
                    <div className='w-full'>
                      <Combobox
                        as='div'
                        onChange={(e) => setSelectedCity(e)}
                        value={selectedCity}
                        className='w-full'
                      >
                        <div className='relative z-20 w-full'>
                          <Combobox.Button className='w-full'>
                            <Combobox.Input
                              autoComplete='off'
                              className='block w-full rounded-lg border-none bg-gray-100 py-4 pl-4 pr-12 text-base font-normal capitalize'
                              onChange={(event) => {
                                doSearchCity(event.target.value);
                              }}
                              placeholder='Which city'
                              displayValue={(place: Place) => place?.name}
                            />

                            <div className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                              <ChevronUpDownIcon
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                            </div>
                          </Combobox.Button>

                          <Transition
                            enter='transition duration-100 ease-out'
                            enterFrom='transform scale-95 opacity-0'
                            enterTo='transform scale-100 opacity-100'
                            leave='transition duration-75 ease-out'
                            leaveFrom='transform scale-100 opacity-100'
                            leaveTo='transform scale-95 opacity-0'
                          >
                            {cities.length > 0 && (
                              <Combobox.Options className='absolute z-auto mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {cities.map((place) => (
                                  <Combobox.Option
                                    key={place.id}
                                    value={place}
                                    className={({ active }) =>
                                      clsx(
                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                        active
                                          ? 'bg-gray-600 text-white'
                                          : 'text-gray-900'
                                      )
                                    }
                                  >
                                    {({ active, selected }) => (
                                      <>
                                        <div className='flex items-center'>
                                          <span
                                            className={clsx(
                                              'ml-3 truncate',
                                              selected && 'font-semibold'
                                            )}
                                          >
                                            {place.name}
                                          </span>
                                        </div>

                                        {selected && (
                                          <span
                                            className={clsx(
                                              'absolute inset-y-0 right-0 flex items-center pr-4',
                                              active
                                                ? 'text-white'
                                                : 'text-indigo-600'
                                            )}
                                          >
                                            <CheckIcon
                                              className='h-5 w-5'
                                              aria-hidden='true'
                                            />
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </Combobox.Option>
                                ))}
                              </Combobox.Options>
                            )}
                          </Transition>
                        </div>
                      </Combobox>
                    </div>
                    <div className='absolute right-0 flex h-full cursor-pointer items-center justify-center rounded-2xl'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='45.171'
                        height='25.085'
                        viewBox='0 0 45.171 25.085'
                        className='max-w-2 max-h-2'
                      >
                        <path
                          id='Path_6416'
                          data-name='Path 6416'
                          d='M27.585,40.585a2.5,2.5,0,0,1-1.768-.732L5.732,19.768a2.5,2.5,0,0,1,3.536-3.536L27.585,34.55,45.9,16.232a2.5,2.5,0,1,1,3.536,3.536L29.353,39.853A2.5,2.5,0,0,1,27.585,40.585Z'
                          transform='translate(-5 -15.5)'
                          fill='#8d8980'
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className='relative w-full'>
                  <div className='flex w-full flex-col items-end'>
                    <div className='w-full'>
                      <input
                        placeholder='$ 800'
                        className='block w-full rounded-lg border-none bg-gray-100 py-4 pl-4 pr-12 text-base font-normal'
                        type='text'
                        value=''
                      />
                    </div>
                  </div>
                </div>
              </div>
              <a
                href={`/buy?s=${selectedCity.name}`}
                className='flex w-full items-center justify-center rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white'
              >
                See the available bikes
              </a>
            </div>
          </div>

          <div className='border-t-2 border-gray-200'>
            <div className='layout py-8'>
              <div className='flex items-center'>
                <h2>Bike types</h2>
                <div className='mx-2 mt-1 rounded-lg bg-gray-800 py-1.5 px-4 text-xs font-bold text-white'>
                  NEW
                </div>
              </div>
              <div className='my-8 grid grid-cols-3 gap-y-6 gap-x-4'>
                {categories.slice(0, 9).map((category) => (
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

                    <div className='my-8 mx-8 flex w-full rounded-lg'>
                      <p className='z-50 mx-2 py-2 text-2xl font-bold capitalize text-white'>
                        {category.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex justify-center'>
                <a
                  href='/categories'
                  className='rounded-lg border border-black bg-black py-4 px-8 font-bold text-white hover:bg-white hover:text-gray-800'
                >
                  View all bike categories
                </a>
              </div>
            </div>
          </div>

          <div className='border-t-2 border-gray-200'>
            <div className='layout py-8'>
              <div className='flex items-center'>
                <h2>Cities</h2>
              </div>
              <div className='my-8 grid grid-cols-3 gap-y-6 gap-x-4'>
                {place.slice(0, 9).map((place) => (
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

                    <div className='my-16 mx-8 flex w-full rounded-lg'>
                      <p className='z-50 mx-2  py-2 text-2xl font-bold lowercase text-white first-letter:capitalize'>
                        {place.name}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div className='flex justify-center'>
                <a
                  href='/cities'
                  className='rounded-lg border border-black bg-black py-4 px-8 font-bold text-white hover:bg-white hover:text-gray-800'
                >
                  View all cities
                </a>
              </div>
            </div>
          </div>

          <div className='border-t-2 border-gray-200'>
            <div className='layout py-8'>
              <div className='flex items-center'>
                <h2>Are you ready to bike with us ? 😁</h2>
              </div>
              <div className='my-12 grid grid-cols-4 gap-y-6 gap-x-4'>
                <div className='col-span-4 row-span-3 rounded-xl bg-black py-12 px-8 md:col-span-2 xl:col-span-1'>
                  <div className='py-2'>
                    <span className='text-5xl font-bold text-white'>
                      10,600 km
                    </span>
                    <p className='text-md my-2 font-light text-gray-200'>
                      bikeways in Quebec
                    </p>
                  </div>
                  <div className='pt-12 pb-2'>
                    <span className='text-5xl font-bold text-white'>
                      4.5 million
                    </span>
                    <p className='text-md my-2 font-light text-gray-200'>
                      cyclists in Quebec
                    </p>
                  </div>
                  <div className='pt-12 pb-2'>
                    <a
                      href=''
                      className='rounded-lg bg-white py-4 px-12 font-semibold text-black hover:bg-gray-200'
                    >
                      View bikes
                    </a>
                  </div>
                </div>
                <div className='col-span-4 row-span-3 rounded-xl md:col-span-2 xl:col-span-3'>
                  <div className='relative h-full w-full'>
                    <div
                      className='absolute z-0 h-full w-full rounded-xl'
                      style={{
                        backgroundImage: "url('images/strava.webp')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />

                    <div className='absolute h-full w-full rounded-xl bg-orange-800 opacity-80' />

                    <div className='absolute z-30 h-full w-full rounded-xl py-14 px-8'>
                      <span className='text-5xl font-bold text-white '>
                        Join us now on Strava
                      </span>
                      <p className='text-md my-2 font-light text-gray-200'>
                        Lets ride together
                      </p>

                      <div className='pt-8 pb-2'>
                        <a
                          href=''
                          className='rounded-lg bg-orange-200 py-4 px-24 font-semibold text-black hover:bg-orange-400'
                        >
                          Join
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-span-4 row-span-3 rounded-xl bg-blue-800 py-12 px-8 '>
                  <div className='py-2'>
                    <span className='text-5xl font-bold text-white'>
                      Welcome to cycle.com
                    </span>
                    <p className='text-md my-2 font-light text-gray-200'>
                      Want to sell your own bike ?
                    </p>
                  </div>

                  <div className='pt-8 pb-2'>
                    <Link
                      href='/sell'
                      className='rounded-lg bg-blue-200 py-4 px-24 font-semibold text-black hover:bg-blue-400'
                    >
                      Sell my bike
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
