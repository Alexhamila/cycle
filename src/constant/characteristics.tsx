import * as React from 'react';

import {
  Brake,
  Brand,
  Category,
  Color,
  Condition,
  Equipment,
  Material,
  Model,
  Place,
} from '@/constant/types';

export const materials: Material[] = [
  {
    id: 1,
    name: 'steel',
  },
  {
    id: 2,
    name: 'aluminium',
  },
  {
    id: 3,
    name: 'carbon',
  },
  {
    id: 4,
    name: 'titanium',
  },
  {
    id: 5,
    name: 'other',
  },
];

export const brakes: Brake[] = [
  {
    id: 1,
    name: 'rim brake (most common)',
  },
  {
    id: 2,
    name: 'disc brake',
  },
  {
    id: 3,
    name: 'other',
  },
];

export const colors: Color[] = [
  {
    id: 1,
    name: 'black',
    color: 'bg-black',
  },
  {
    id: 2,
    name: 'gray',
    color: 'bg-gray-600',
  },
  {
    id: 3,
    name: 'white',
    color: 'bg-white',
  },
  {
    id: 4,
    name: 'red',
    color: 'bg-[#ef4444]',
  },
  {
    id: 5,
    name: 'orange',
    color: 'bg-[#f97316]',
  },
  {
    id: 6,
    name: 'yellow',
    color: 'bg-[#fde047]',
  },
  {
    id: 7,
    name: 'green',
    color: 'bg-[#84cc16]',
  },
  {
    id: 8,
    name: 'blue',
    color: 'bg-[#0ea5e9]',
  },
  {
    id: 9,
    name: 'purple',
    color: 'bg-[#7c3aed]',
  },
  {
    id: 10,
    name: 'other',
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: 'city bike',
    image: 'images/categories/citybike.webp',
  },
  {
    id: 2,
    name: 'gravel bike',
    image: 'images/categories/gravelbike.webp',
  },
  {
    id: 3,
    name: 'mountain bike',
    image: 'images/categories/mountainbike.webp',
  },
  {
    id: 4,
    name: 'racing bike',
    image: 'images/categories/racingbike.webp',
  },
  {
    id: 5,
    name: 'single-speed bike',
    image: 'images/categories/singlespeedbike.webp',
  },
  {
    id: 6,
    name: 'road bike',
    image: 'images/categories/roadbike.webp',
  },
  {
    id: 7,
    name: 'electric bike',
    image: 'images/categories/electricbike.webp',
  },
  {
    id: 8,
    name: 'cargo bike',
    image: 'images/categories/cargobike.webp',
  },
  {
    id: 9,
    name: 'child bike',
    image: 'images/categories/childbike.webp',
  },
  {
    id: 10,
    name: 'trekking bike',
    image: 'images/categories/trekkingbike.webp',
  },
  {
    id: 11,
    name: 'bmx',
    image: 'images/categories/bmxbike.webp',
  },
  {
    id: 12,
    name: 'folding-compact bike',
    image: 'images/categories/foldingcompactbike.webp',
  },
];

export const conditions: Condition[] = [
  {
    id: 1,
    rank: '5',
    title: 'Nearly perfect',
    description:
      'Barely any visible signs of use or professionally repared. Was treated with the utmost care while driving. Runs flawlessly with no noise.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='33.297'
        height='32.999'
        viewBox='0 0 33.297 32.999'
        className='h-6 w-6'
      >
        <path
          id='Path_281_-_Outline'
          data-name='Path 281 - Outline'
          d='M85.407,176.156h0a2.778,2.778,0,0,1-1.541-.476L78.194,171.9a2.228,2.228,0,0,0-2.47,0l-5.672,3.776a2.778,2.778,0,0,1-1.541.476,2.846,2.846,0,0,1-2.216-1.088,2.721,2.721,0,0,1-.5-2.371l1.76-7.238a2.221,2.221,0,0,0-.7-2.206l-5.582-4.866a2.792,2.792,0,0,1,1.647-4.89l6.992-.47a2.234,2.234,0,0,0,1.935-1.436l2.5-6.628a2.792,2.792,0,0,1,5.223,0l2.5,6.628a2.234,2.234,0,0,0,1.935,1.436L91,153.5a2.792,2.792,0,0,1,1.647,4.89l-5.582,4.866a2.221,2.221,0,0,0-.7,2.206l1.76,7.238a2.721,2.721,0,0,1-.5,2.371A2.846,2.846,0,0,1,85.407,176.156Zm-8.448-7.7a5.285,5.285,0,0,1,2.938.888l5.072,3.376-1.589-6.538a5.283,5.283,0,0,1,1.668-5.249l5.068-4.418-6.312-.425a5.314,5.314,0,0,1-4.6-3.416l-2.24-5.93-2.24,5.93a5.314,5.314,0,0,1-4.6,3.416l-6.312.425,5.068,4.418a5.283,5.283,0,0,1,1.668,5.249l-1.589,6.538,5.072-3.376A5.286,5.286,0,0,1,76.96,168.457Z'
          transform='translate(-60.311 -143.157)'
          fill='currentColor'
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    rank: '4',
    title: 'Good condition',
    description:
      'Small visual or technical defects. No immediate work needed. Drives flawlessly.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='27.899'
        height='32.998'
        viewBox='0 0 27.899 32.998'
        className='h-6 w-6'
      >
        <path
          id='Path_283'
          data-name='Path 283'
          d='M-6614.445-9735.479l-5.671-3.775a2.224,2.224,0,0,0-1.235-.373,2.221,2.221,0,0,0-1.234.373,1.536,1.536,0,0,1-2.131-.428,1.537,1.537,0,0,1,.428-2.131,5.3,5.3,0,0,1,2.938-.889,5.294,5.294,0,0,1,2.938.889l5.072,3.377-1.589-6.538a5.284,5.284,0,0,1,1.667-5.249,1.538,1.538,0,0,1,2.168.149,1.537,1.537,0,0,1-.149,2.168,2.22,2.22,0,0,0-.7,2.206l1.76,7.238a2.722,2.722,0,0,1-.5,2.371A2.846,2.846,0,0,1-6612.9-9735,2.772,2.772,0,0,1-6614.445-9735.479Zm-17.57-.611a2.723,2.723,0,0,1-.5-2.371l1.76-7.238a2.22,2.22,0,0,0-.7-2.206l-5.581-4.866a2.752,2.752,0,0,1-.811-3,2.752,2.752,0,0,1,2.458-1.893l6.992-.471a2.235,2.235,0,0,0,1.935-1.436l2.5-6.629a2.742,2.742,0,0,1,2.611-1.8,2.74,2.74,0,0,1,2.611,1.8l2.5,6.629a2.237,2.237,0,0,0,1.935,1.436,1.536,1.536,0,0,1,1.43,1.636,1.538,1.538,0,0,1-1.636,1.431,5.315,5.315,0,0,1-4.6-3.416l-2.24-5.932-2.24,5.932a5.314,5.314,0,0,1-4.6,3.416l-6.312.424,5.068,4.418a5.284,5.284,0,0,1,1.668,5.249l-1.687,6.937a1.539,1.539,0,0,1,1.2,1.5A1.536,1.536,0,0,1-6629.8-9735,2.846,2.846,0,0,1-6632.015-9736.09Z'
          transform='translate(6638 9768)'
          fill='currentColor'
        ></path>
      </svg>
    ),
  },
  {
    id: 3,
    rank: '3',
    title: 'Medium condition',
    description:
      'Has some visual marks. Some marks of rust and some scratches may be present. Obvious technically defects. Possible noise while driving.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='27.899'
        height='32.998'
        viewBox='0 0 27.899 32.998'
        className='h-6 w-6'
      >
        <path
          id='Path_284'
          data-name='Path 284'
          d='M-6612.9-9735a2.77,2.77,0,0,1-1.54-.477l-5.672-3.775a2.222,2.222,0,0,0-1.234-.373,2.223,2.223,0,0,0-1.235.373,1.536,1.536,0,0,1-2.131-.428,1.537,1.537,0,0,1,.428-2.131,5.3,5.3,0,0,1,2.938-.889,5.3,5.3,0,0,1,2.938.889l5.218,3.475a1.537,1.537,0,0,1,1.156-1.252,1.535,1.535,0,0,1,1.854,1.129,2.723,2.723,0,0,1-.5,2.371A2.846,2.846,0,0,1-6612.9-9735Zm-19.11-1.088a2.72,2.72,0,0,1-.5-2.371l1.759-7.238a2.219,2.219,0,0,0-.7-2.206l-5.582-4.866a2.754,2.754,0,0,1-.812-2.994,2.752,2.752,0,0,1,2.458-1.895l6.992-.471a2.236,2.236,0,0,0,1.935-1.436l2.5-6.629a2.741,2.741,0,0,1,2.612-1.8,2.742,2.742,0,0,1,2.611,1.8l2.5,6.629a2.237,2.237,0,0,0,1.936,1.436,1.536,1.536,0,0,1,1.43,1.636,1.537,1.537,0,0,1-1.636,1.431,5.316,5.316,0,0,1-4.6-3.416l-2.239-5.932-2.24,5.932a5.314,5.314,0,0,1-4.6,3.416l-6.312.424,5.068,4.418a5.286,5.286,0,0,1,1.668,5.249l-1.687,6.937a1.538,1.538,0,0,1,1.2,1.5A1.537,1.537,0,0,1-6629.8-9735,2.844,2.844,0,0,1-6632.014-9736.09Z'
          transform='translate(6638 9768)'
          fill='currentColor'
        ></path>
      </svg>
    ),
  },
  {
    id: 4,
    rank: '2',
    title: 'Can be riden',
    description:
      'Can sit on it, moves a little, not the most fun. Not in a regular-ride state, medium to heavy rust.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='25.132'
        height='32.999'
        viewBox='0 0 25.132 32.999'
        className='h-6 w-6'
      >
        <path
          id='Path_287_-_Outline'
          data-name='Path 287 - Outline'
          d='M1214.252,176.156a2.846,2.846,0,0,1-2.216-1.088,2.722,2.722,0,0,1-.5-2.371l1.76-7.238a2.22,2.22,0,0,0-.7-2.206l-5.582-4.866a2.792,2.792,0,0,1,1.647-4.89l6.992-.47a2.234,2.234,0,0,0,1.935-1.436l2.5-6.628a2.791,2.791,0,0,1,5.223,0l2.5,6.628a2.233,2.233,0,0,0,1.935,1.436,1.537,1.537,0,1,1-.206,3.066,5.314,5.314,0,0,1-4.6-3.416l-2.24-5.93-2.24,5.93a5.314,5.314,0,0,1-4.6,3.416l-6.312.425,5.068,4.418a5.283,5.283,0,0,1,1.668,5.249l-1.686,6.937a1.537,1.537,0,0,1-.341,3.035Z'
          transform='translate(-1206.051 -143.157)'
          fill='currentColor'
        ></path>
      </svg>
    ),
  },
  {
    id: 5,
    rank: '1',
    title: 'Cannot be riden as of right now',
    description:
      'For amateurs or for spare parts. Very dirty, damaged or with partially missing elements. Cannot be riden on the road.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='25.132'
        height='24.201'
        viewBox='0 0 25.132 24.201'
        className='h-6 w-6'
      >
        <path
          id='Path_289_-_Outline'
          data-name='Path 289 - Outline'
          d='M1564.538,167.358a1.538,1.538,0,0,1-1.494-1.9,2.22,2.22,0,0,0-.7-2.206l-5.582-4.866a2.792,2.792,0,0,1,1.647-4.89l6.992-.47a2.233,2.233,0,0,0,1.935-1.436l2.5-6.628a2.791,2.791,0,0,1,5.223,0l2.5,6.628a2.233,2.233,0,0,0,1.935,1.436,1.537,1.537,0,0,1-.206,3.066,5.314,5.314,0,0,1-4.6-3.416l-2.24-5.93-2.24,5.93a5.314,5.314,0,0,1-4.6,3.416l-6.312.425,5.068,4.418a5.284,5.284,0,0,1,1.668,5.249A1.537,1.537,0,0,1,1564.538,167.358Z'
          transform='translate(-1555.802 -143.157)'
          fill='currentColor'
        ></path>
      </svg>
    ),
  },
];

export const model: Model[] = [
  {
    id: 1,
    name: 'Road 100',
    imageUrl: '/data/images/Yakima_c3NTQ.webp',
  },
];

export const equipments: Equipment[] = [
  {
    id: 1,
    name: 'headlight',
  },
  {
    id: 2,
    name: 'taillight',
  },
  {
    id: 3,
    name: 'reflectors',
  },
  {
    id: 4,
    name: 'lock',
  },
  {
    id: 5,
    name: 'rim lock',
  },
  {
    id: 6,
    name: 'bell',
  },
  {
    id: 7,
    name: 'porter',
  },
  {
    id: 8,
    name: 'basket',
  },
  {
    id: 9,
    name: 'stand',
  },
  {
    id: 10,
    name: 'phone holder',
  },
  {
    id: 11,
    name: 'mud protector',
  },
];

export const place: Place[] = [
  {
    id: 1,
    name: 'MONTREAL',
    province: 'QC',
    image: '/images/places/montreal.jpg',
  },
  {
    id: 2,
    name: 'LAVAL',
    province: 'QC',
    image: '/images/places/laval.webp',
  },
  {
    id: 3,
    name: 'LONGUEUIL',
    province: 'QC',
    image: '/images/places/longueuil.webp',
  },
];

export const brand: Brand[] = [
  {
    id: 1,
    name: 'Trek',
    logo: 'Trek_k2NzM',
  },
  {
    id: 2,
    name: 'Cannondale',
    logo: 'Cannondale_Q1NTY',
  },
  {
    id: 3,
    name: 'Kona',
    logo: 'Kona_AzNzU',
  },
  {
    id: 4,
    name: 'Specialized',
    logo: 'a0dc8ddcc93f99a47c8117c10e1ff68c270a105a',
  },
  {
    id: 5,
    name: 'Merida',
    logo: 'MERIDA_kzNTI',
  },
  {
    id: 6,
    name: 'Scott',
    logo: 'SCOTT_I3OTM',
  },
  {
    id: 7,
    name: 'Santa Cruz',
    logo: 'Santa_Cruz_MwNzA',
  },
  {
    id: 8,
    name: 'Cervelo',
    logo: 'Cervelo_g0MDg',
  },
  {
    id: 9,
    name: 'Giant',
    logo: 'f1485864263f6db6bd07ab28b3b96d17063ad5c4',
  },
];
