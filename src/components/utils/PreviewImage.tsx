import * as React from 'react';

const PreviewImage = ({
  key,
  imgSrc,
  deleteImage,
}: {
  key: string;
  imgSrc: string;
  deleteImage: (id: any) => void;
}) => {
  return (
    <li key={key} className='block h-24 w-full p-1'>
      <article
        tabIndex={0}
        className='focus:shadow-outline group relative h-full w-full cursor-pointer rounded-md bg-gray-100 text-transparent shadow-sm hover:text-white focus:outline-none'
      >
        <img
          src={imgSrc}
          alt='upload preview'
          className='img-preview sticky h-full w-full rounded-md bg-fixed object-cover'
        />

        <section className='absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md py-2 px-3 text-xs'>
          <h1 className='flex-1'></h1>
          <div className='flex'>
            <span className='p-1'>
              <i>
                <svg
                  className='pt- ml-auto h-4 w-4 fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z' />
                </svg>
              </i>
            </span>

            <p className='size p-1 text-xs'></p>
            <a
              onClick={deleteImage}
              className='ml-auto cursor-pointer rounded-md p-1 hover:bg-gray-300 focus:outline-none'
            >
              <svg
                className='pointer-events-none ml-auto h-4 w-4 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path
                  className='pointer-events-none'
                  d='M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z'
                />
              </svg>
            </a>
          </div>
        </section>
      </article>
    </li>
  );
};

export default PreviewImage;
