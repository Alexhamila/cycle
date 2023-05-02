import { Combobox, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Form, Formik } from 'formik';
import uniqueId from 'lodash/uniqueId';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import { TagsInput } from 'react-tag-input-component';

import WithAuth from '@/lib/auth/WithAuth';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import PreviewImage from '@/components/utils/PreviewImage';

import {
  brakes,
  brand,
  categories,
  colors,
  conditions,
  equipments,
  materials,
  place,
} from '@/constant/characteristics';
import { Brand, Category, Place } from '@/constant/types';

export default function SellsPage() {
  const [brands, setBrands] = useState(brand);
  const [cities, setCities] = useState(place);

  const [queryCategory, setQueryCategory] = useState('');

  const [purchasedPrice, setPurchasedPrice] = useState('');
  const [purchasedAge, setPurchasedAge] = useState('');
  const [valuation, setValuation] = useState('');
  const [images, setImages] = useState([]);

  const deleteImage = (id) => {
    setImages(images.filter((item) => item.id !== id));
  };

  const uploadMultipleFiles = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (images.length <= 10 && images.length + i < 10) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImages((imgs) => [
            ...imgs,
            { src: reader.result, id: uniqueId('image') },
          ]);
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      }
    }
  };

  function isNumeric(value: string) {
    return /^\d+$/.test(value);
  }

  const doSearchBrand = (e) => {
    fetch(`/api/bike/brands?s=${e}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (b) => {
      const res = await b.json();
      setBrands(res);
    });
  };

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

  React.useEffect(() => {
    if (purchasedPrice && purchasedAge) {
      if (isNumeric(purchasedPrice) && isNumeric(purchasedAge)) {
        const currentYear = new Date().getFullYear();
        const howOld = currentYear - parseInt(purchasedAge);
        const calc = Math.round(
          (parseInt(purchasedPrice) / 1.2) * 0.95 ** howOld
        );

        setValuation(calc.toString());
      }
    }
  }, [purchasedPrice, purchasedAge]);

  const [equipment, setEquipment] = useState<string[]>([]);

  const router = useRouter();

  const filteredCategory =
    queryCategory === ''
      ? categories
      : categories.filter((category) => {
          return category.name
            .toLowerCase()
            .includes(queryCategory.toLowerCase());
        });

  return (
    <WithAuth>
      <Layout withoutMenus={false} progressBar={true}>
        <Seo templateTitle='Sell' />

        <main className='bg-gray-100'>
          <section className='layout py-12'>
            <Formik
              initialValues={{
                brand: {
                  id: null,
                  name: '',
                  logo: '',
                },
                model: '',
                location: {
                  id: null,
                  province: '',
                  name: '',
                },
                category: {
                  id: null,
                  name: '',
                  image: '',
                },
                year: '',
                framesize: '',
                condition: {
                  id: null,
                  rank: '',
                  title: '',
                  description: '',
                  icon: '',
                },
                framematerial: {
                  id: null,
                  name: '',
                },
                braketype: {
                  id: null,
                  name: '',
                },
                color: {
                  id: null,
                  name: '',
                  color: '',
                },
                description: '',
                price: '',
              }}
              onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                //toast.success(JSON.stringify(values, null, 2));

                const body = {
                  userId: 'clckv8s1p00009kujkn96s553',
                  published: true,
                  brand: values.brand.name,
                  model: values.model,
                  category: values.category.name,
                  year: values.year,
                  framesize: values.framesize,
                  condition: values.condition.rank,
                  location: values.location.name,
                  lat: '0',
                  lng: '0',
                  framematerial: values.framematerial.name,
                  braketype: values.braketype.name,
                  color: values.color.name,

                  description: values.description,

                  price: values.price,
                };

                fetch(`/api/bike/sell`, {
                  method: 'POST',
                  body: JSON.stringify(body),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then(async (b) => {
                    const res = await b.json();
                    toast.success('Your bike has been published !');
                  })
                  .catch((err) => {
                    toast.error('Your bike has not been published: ' + err);
                  });

                //router.push('/');
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
              }) => (
                <Form className='space-y-8 divide-y divide-gray-200'>
                  <div>
                    <div className='mx-auto max-w-4xl rounded-xl bg-white p-6 text-xl font-semibold shadow-lg'>
                      <h3 className='text-lg font-bold leading-6 text-gray-900'>
                        What bike do you want to sell ?
                      </h3>
                      <p className='mt-1 text-sm font-normal text-gray-500'>
                        Provide your bike brand and model.
                      </p>

                      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                        <div className='my-2 sm:col-span-6'>
                          <div className='mb-2'>
                            <div className='mt-1 flex w-full rounded-md shadow-sm'>
                              <Combobox
                                as='div'
                                onChange={(e) => setFieldValue('brand', e)}
                                onBlur={handleBlur}
                                value={values.brand}
                                className='w-full'
                              >
                                <Combobox.Label className='block text-sm font-medium text-gray-700'>
                                  Brand
                                </Combobox.Label>
                                <div className='relative z-20 mt-1 w-full'>
                                  <Combobox.Button className='w-full'>
                                    <Combobox.Input
                                      autoComplete='off'
                                      className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm'
                                      onChange={(event) => {
                                        doSearchBrand(event.target.value);
                                      }}
                                      displayValue={(brand: Brand) =>
                                        brand?.name
                                      }
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
                                    {brands.length > 0 && (
                                      <Combobox.Options className='absolute z-auto mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                        {brands.map((brand) => (
                                          <Combobox.Option
                                            key={brand.id}
                                            value={brand}
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
                                                  <img
                                                    src={`/data/images/${brand.logo}.webp`}
                                                    alt=''
                                                    className='h-6 w-6 flex-shrink-0 rounded-full'
                                                  />
                                                  <span
                                                    className={clsx(
                                                      'ml-3 truncate',
                                                      selected &&
                                                        'font-semibold'
                                                    )}
                                                  >
                                                    {brand.name}
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
                            <a className='text-xs font-light text-gray-800'>
                              Can't find your brand ?{' '}
                              <span
                                onClick={() => {
                                  setFieldValue('brand', { name: 'Other' });
                                }}
                                className='cursor-pointer text-blue-400'
                              >
                                click here
                              </span>
                            </a>
                          </div>

                          <div className='mt-1 mb-4 w-full rounded-md shadow-sm'>
                            <label
                              htmlFor='model'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Model (Optional)
                            </label>
                            <div className='mt-1'>
                              <input
                                type='model'
                                name='model'
                                id='model'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.model}
                                className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm'
                                placeholder=''
                              />
                            </div>
                          </div>

                          <div className='mt-1 mb-4 flex w-full rounded-md shadow-sm'>
                            <Combobox
                              as='div'
                              onChange={(e) => setFieldValue('category', e)}
                              onBlur={handleBlur}
                              value={values.category}
                              className='w-full'
                            >
                              <Combobox.Label className='block text-sm font-medium text-gray-700'>
                                Category
                              </Combobox.Label>
                              <div className='relative mt-1 w-full'>
                                <Combobox.Button className='w-full'>
                                  <Combobox.Input
                                    autoComplete='off'
                                    className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm'
                                    onChange={(event) =>
                                      setQueryCategory(event.target.value)
                                    }
                                    displayValue={(category: Category) =>
                                      category?.name
                                    }
                                  />

                                  <div className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                                    <ChevronUpDownIcon
                                      className='h-5 w-5 text-gray-400'
                                      aria-hidden='true'
                                    />
                                  </div>
                                </Combobox.Button>

                                <Transition
                                  className='relative z-50'
                                  enter='transition duration-100 ease-out'
                                  enterFrom='transform scale-95 opacity-0'
                                  enterTo='transform scale-100 opacity-100'
                                  leave='transition duration-75 ease-out'
                                  leaveFrom='transform scale-100 opacity-100'
                                  leaveTo='transform scale-95 opacity-0'
                                >
                                  {filteredCategory.length > 0 && (
                                    <Combobox.Options className='absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                      {filteredCategory.map((category) => (
                                        <Combobox.Option
                                          key={category.id}
                                          value={category}
                                          className={({ active }) =>
                                            clsx(
                                              'relative z-50 cursor-default select-none py-2 pl-3 pr-9',
                                              active
                                                ? 'bg-gray-600 text-white'
                                                : 'text-gray-900'
                                            )
                                          }
                                        >
                                          {({ active, selected }) => (
                                            <>
                                              <div className='z-50 flex items-center'>
                                                <span
                                                  className={clsx(
                                                    'z-50 ml-3 truncate',
                                                    selected && 'font-semibold'
                                                  )}
                                                >
                                                  {category.name}
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

                          <div className='mb-4'>
                            <label
                              htmlFor='year'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Year (Optional)
                            </label>
                            <div className='mt-1'>
                              <input
                                type='year'
                                name='year'
                                id='year'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.year}
                                className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black'
                                placeholder='2023'
                              />
                            </div>
                          </div>

                          <div className='relative z-0'>
                            <label
                              htmlFor='framesize'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Frame Size (cm)
                            </label>
                            <div className='relative mt-1 rounded-md shadow-sm'>
                              <input
                                type='size'
                                name='framesize'
                                id='framesize'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.framesize}
                                className='z-0 block w-full rounded-md border border-gray-300 py-2 pl-2 pr-12 text-sm focus:border-indigo-500 focus:ring-indigo-500'
                                placeholder='51'
                              />
                              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                                <span
                                  className='text-sm text-gray-500'
                                  id='price-currency'
                                >
                                  cm
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mx-auto my-14 max-w-4xl rounded-xl bg-white p-6 text-xl font-semibold shadow-lg'>
                      <h3 className='text-lg font-bold leading-6 text-gray-900'>
                        In what state is the bike ?
                      </h3>
                      <p className='mt-1 text-sm font-normal text-gray-500'>
                        Choose an option of the following.
                      </p>

                      <div className='col-span-1 grid gap-y-6 py-4'>
                        {conditions.map((condition) => (
                          <div
                            key={condition.id}
                            onClick={() =>
                              setFieldValue(
                                'condition',
                                conditions.find(
                                  (item) => item.id == condition.id
                                )
                              )
                            }
                            className={clsx(
                              'w-full transform cursor-pointer rounded-lg bg-gray-100 p-4 transition-all delay-75 ease-in-out hover:-translate-y-1 hover:bg-gray-200',
                              values.condition?.id == condition.id
                                ? 'bg-slate-900 text-gray-200 hover:bg-black'
                                : ''
                            )}
                          >
                            <div className='flex items-center py-2'>
                              <div className='pr-4'>{condition.icon}</div>
                              <h4 className='text-md font-semibold'>
                                {condition.title}
                              </h4>
                            </div>
                            <p className='py-2 text-sm font-light'>
                              {condition.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='mx-auto my-14 max-w-4xl rounded-xl bg-white p-6 text-xl font-semibold shadow-lg'>
                      <h3 className='text-lg font-bold leading-6 text-gray-900'>
                        Where are you located ?
                      </h3>
                      <p className='mt-1 text-sm font-normal text-gray-500'>
                        Provide your city or postal code.
                      </p>

                      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                        <div className='my-2 sm:col-span-6'>
                          <div className='mt-1 mb-4 flex w-full rounded-md shadow-sm'>
                            <Combobox
                              as='div'
                              onChange={(e) => setFieldValue('location', e)}
                              onBlur={handleBlur}
                              value={values.location}
                              className='w-full'
                            >
                              <Combobox.Label className='block text-sm font-medium text-gray-700'>
                                City
                              </Combobox.Label>
                              <div className='relative z-20 mt-1 w-full'>
                                <Combobox.Button className='w-full'>
                                  <Combobox.Input
                                    autoComplete='off'
                                    className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm'
                                    onChange={(event) => {
                                      doSearchCity(event.target.value);
                                    }}
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
                        </div>
                      </div>
                    </div>

                    <div className='mx-auto my-14 max-w-4xl rounded-xl bg-white p-6 text-xl font-semibold shadow-lg'>
                      <h3 className='text-lg font-bold leading-6 text-gray-900'>
                        Optional Details
                      </h3>
                      <p className='mt-1 text-sm font-normal text-gray-500'>
                        Add details regarding your bike.
                      </p>

                      <Listbox
                        onChange={(e) => setFieldValue('framematerial', e)}
                        value={values.framematerial}
                      >
                        {({ open }) => (
                          <div className='mt-1 mb-4 py-2'>
                            <Listbox.Label className='block text-sm font-medium text-gray-700'>
                              Frame Material (Optional)
                            </Listbox.Label>
                            <div className='relative mt-1'>
                              <Listbox.Button className='relative min-h-[32px] w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
                                <span className='block truncate'>
                                  {values.framematerial &&
                                    values.framematerial.name}
                                </span>
                                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                  <ChevronUpDownIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave='transition ease-in duration-100'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                              >
                                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                  {materials.map((material) => (
                                    <Listbox.Option
                                      key={material.id}
                                      className={({ active }) =>
                                        clsx(
                                          active
                                            ? 'bg-gray-600 text-white'
                                            : 'text-gray-900',
                                          'relative cursor-default select-none py-2 pl-3 pr-9'
                                        )
                                      }
                                      value={material}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={clsx(
                                              selected
                                                ? 'font-semibold'
                                                : 'font-normal',
                                              'block truncate'
                                            )}
                                          >
                                            {material.name}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={clsx(
                                                active
                                                  ? 'text-white'
                                                  : 'text-gray-600',
                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                              )}
                                            >
                                              <CheckIcon
                                                className='h-5 w-5'
                                                aria-hidden='true'
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </div>
                        )}
                      </Listbox>

                      <Listbox
                        onChange={(e) => setFieldValue('braketype', e)}
                        value={values.braketype}
                      >
                        {({ open }) => (
                          <div className='mt-1 mb-4 py-2'>
                            <Listbox.Label className='block text-sm font-medium text-gray-700'>
                              Brake Type (Optional)
                            </Listbox.Label>
                            <div className='relative mt-1'>
                              <Listbox.Button className='relative min-h-[32px] w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
                                <span className='block truncate'>
                                  {values.braketype && values.braketype.name}
                                </span>
                                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                  <ChevronUpDownIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave='transition ease-in duration-100'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                              >
                                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                  {brakes.map((brake) => (
                                    <Listbox.Option
                                      key={brake.id}
                                      className={({ active }) =>
                                        clsx(
                                          active
                                            ? 'bg-gray-600 text-white'
                                            : 'text-gray-900',
                                          'relative cursor-default select-none py-2 pl-3 pr-9'
                                        )
                                      }
                                      value={brake}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={clsx(
                                              selected
                                                ? 'font-semibold'
                                                : 'font-normal',
                                              'block truncate'
                                            )}
                                          >
                                            {brake.name}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={clsx(
                                                active
                                                  ? 'text-white'
                                                  : 'text-gray-600',
                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                              )}
                                            >
                                              <CheckIcon
                                                className='h-5 w-5'
                                                aria-hidden='true'
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </div>
                        )}
                      </Listbox>

                      <label className='mb-4 block text-sm font-medium text-gray-700'>
                        Frame Main Color (Optional)
                      </label>

                      <div className='grid grid-cols-6 gap-4'>
                        {colors.map((color) => (
                          <div
                            key={color.id}
                            className={clsx(
                              'col-span-2 flex w-full transform cursor-pointer items-center rounded-lg border bg-gray-100 py-2 px-2 transition-all delay-75 ease-in-out hover:-translate-y-0.5 hover:bg-gray-200 sm:col-span-1',
                              values.color?.id == color.id
                                ? 'border-gray-600 hover:border-gray-800'
                                : 'border-gray-100 hover:border-gray-200'
                            )}
                            onClick={() =>
                              setFieldValue(
                                'color',
                                colors.find((item) => item.id == color.id)
                              )
                            }
                          >
                            <div
                              className={clsx(
                                'h-6 w-6 rounded-lg',
                                color.color
                                  ? color.color
                                  : 'bg-gradient-to-r from-blue-400 to-violet-600'
                              )}
                            />
                            <p className='ml-2 text-sm font-normal'>
                              {color.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='mx-auto my-14 max-w-4xl rounded-xl bg-white p-6 text-xl font-semibold shadow-lg'>
                      <h3 className='text-lg font-bold leading-6 text-gray-900'>
                        How equiped is your bike ?
                      </h3>
                      <p className='mt-1 text-sm font-normal text-gray-500'>
                        Choose the equipment installed on your bike.
                      </p>

                      <div className='grid grid-cols-7 gap-2 py-4'>
                        {equipments.map((equip) => (
                          <div
                            key={equip.id}
                            onClick={() => {
                              if (!equipment.find((e) => e == equip.name))
                                setEquipment([...equipment, equip.name]);
                            }}
                            className='cursor-pointer rounded-md bg-gray-100 py-1 px-2 text-sm font-normal hover:bg-gray-200'
                          >
                            {equip.name}
                          </div>
                        ))}
                      </div>
                      <div className='col-span-1 grid gap-y-6 py-4'>
                        <TagsInput
                          classNames={{
                            input: 'font-normal h-6 text-xs',
                            tag: 'text-sm',
                          }}
                          value={equipment}
                          onChange={setEquipment}
                          name='equipment'
                        />
                      </div>
                    </div>

                    <div className='mx-auto my-14 max-w-4xl rounded-xl bg-white p-6 text-xl font-semibold shadow-lg'>
                      <h3 className='text-lg font-bold leading-6 text-gray-900'>
                        Detailled description
                      </h3>
                      <p className='mt-1 text-sm font-normal text-gray-500'>
                        We recommend that you enter all the special features and
                        advantages of your bike in this description.
                      </p>

                      <div className='py-4'>
                        <textarea
                          rows={4}
                          name='description'
                          id='description'
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        />
                      </div>
                    </div>

                    <div className='mx-auto my-14 max-w-4xl rounded-xl bg-white p-6 text-xl font-semibold shadow-lg'>
                      <h3 className='text-lg font-bold leading-6 text-gray-900'>
                        Pictures
                      </h3>
                      <p className='mt-1 text-sm font-normal text-gray-500'>
                        We recommend that you upload more than one picture.
                      </p>

                      <div className='py-4'>
                        <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                          <label
                            htmlFor='photos'
                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                          >
                            Photos (max 10)
                          </label>
                          <div className='mt-1 sm:col-span-2 sm:mt-0'>
                            <div className='flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                              <div className='space-y-1 text-center'>
                                <svg
                                  className='mx-auto h-12 w-12 text-gray-400'
                                  stroke='currentColor'
                                  fill='none'
                                  viewBox='0 0 48 48'
                                  aria-hidden='true'
                                >
                                  <path
                                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                    strokeWidth={2}
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                </svg>
                                <div className='flex text-sm text-gray-600'>
                                  <label
                                    htmlFor='file-upload'
                                    className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                                  >
                                    <span>Upload your files</span>
                                    <input
                                      id='file-upload'
                                      name='file-upload'
                                      type='file'
                                      className='sr-only'
                                      onChange={uploadMultipleFiles}
                                      multiple={true}
                                    />
                                  </label>
                                  <p className='pl-1'>or drag and drop</p>
                                </div>
                                <p className='text-xs text-gray-500'>
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                            <div className='grid grid-cols-5 gap-4 py-8'>
                              {images.map((image) => (
                                <PreviewImage
                                  deleteImage={() => deleteImage(image.id)}
                                  key={image.id}
                                  imgSrc={image.src}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mx-auto my-14 max-w-4xl rounded-xl bg-white p-6 text-xl font-semibold shadow-lg'>
                      <div className='relative h-full w-full'>
                        <div className='flex items-center'>
                          <h3 className='relative text-lg font-bold leading-6 text-gray-900'>
                            Price Evaluator
                          </h3>
                          <div className='mx-2 rounded-lg bg-gray-800 py-1 px-4 text-xs text-white'>
                            NEW
                          </div>
                        </div>

                        <p className='mt-1 text-sm font-normal text-gray-500'>
                          We recommend that you use this tool if you're not sure
                          how much your bike is worth.
                        </p>

                        <div className='py-4'>
                          <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                            <label
                              htmlFor='purchaseprice'
                              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                            >
                              What price did you pay for your bike ?
                            </label>
                            <div className='mt-1 sm:col-span-2 sm:mt-0'>
                              <div className='relative mt-1 rounded-md shadow-sm'>
                                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                                  <span className='text-sm text-gray-500'>
                                    $
                                  </span>
                                </div>
                                <input
                                  type='text'
                                  name='purchasedprice'
                                  id='purchasedprice'
                                  value={purchasedPrice}
                                  onChange={(e) =>
                                    setPurchasedPrice(e.target.value)
                                  }
                                  className='block w-full rounded-md border-gray-300 pl-7 pr-12 text-sm focus:border-indigo-500 focus:ring-indigo-500'
                                  placeholder='0.00'
                                  aria-describedby='price-currency'
                                />
                                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                                  <span
                                    className='text-sm text-gray-500'
                                    id='price-currency'
                                  >
                                    CAD
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5'>
                            <label
                              htmlFor='purchaseage'
                              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                            >
                              How old is your bike ?
                            </label>
                            <div className='mt-1 sm:col-span-2 sm:mt-0'>
                              <input
                                type='text'
                                name='purchaseage'
                                id='purchaseage'
                                placeholder='2023'
                                value={purchasedAge}
                                onChange={(e) =>
                                  setPurchasedAge(e.target.value)
                                }
                                className='block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-50'
                              />
                            </div>
                          </div>

                          <div className='text-md mt-8 border-t pt-8 font-normal'>
                            {valuation && (
                              <p>
                                The estimated price for your bike is ${' '}
                                {valuation}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mx-auto my-14 max-w-4xl rounded-xl bg-white p-6 text-xl font-semibold shadow-lg'>
                      <h3 className='text-lg font-bold leading-6 text-gray-900'>
                        Price
                      </h3>
                      <p className='mt-1 text-sm font-normal text-gray-500'>
                        You can use our price evaluator or take a look at offers
                        for similar bikes on the website before setting a price
                        for yours.
                      </p>

                      <div className='py-4'>
                        <label
                          htmlFor='price'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Price
                        </label>
                        <div className='relative mt-1 rounded-md shadow-sm'>
                          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                            <span className='text-sm text-gray-500'>$</span>
                          </div>
                          <input
                            type='text'
                            name='price'
                            id='price'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            className='block w-full rounded-md border-gray-300 pl-7 pr-12 text-sm focus:border-indigo-500 focus:ring-indigo-500'
                            placeholder='0.00'
                            aria-describedby='price-currency'
                          />
                          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                            <span
                              className='text-sm text-gray-500'
                              id='price-currency'
                            >
                              CAD
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='pt-5'>
                    <div className='flex justify-end'>
                      <button
                        type='button'
                        onClick={() => router.push('/')}
                        className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </section>
        </main>
      </Layout>
    </WithAuth>
  );
}
