import { useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';

const ProgressBar = () => {
  const { y } = useWindowScroll();
  const [pageHeight, setPageHeight] = useState<number>(0);

  useEffect(() => {
    setPageHeight(document.body.scrollHeight - window.innerHeight);
  });

  useEffect(() => {
    const percentScrolled = (Math.abs(y) / pageHeight) * 100;
    const el = document.getElementById('scroll-progress');
    el?.style.setProperty(
      '--tw-gradient-stops',
      `var(--tw-ring-color) ${percentScrolled}%, transparent 0`
    );
  }, [y, pageHeight]);

  return (
    <div
      id='scroll-progress'
      className='
        fixed
        top-0 left-0
        z-50 h-2
        w-full bg-gradient-to-r p-0 ring-black ring-opacity-100 dark:ring-gray-50 dark:ring-opacity-75 
      '
    />
  );
};

export default ProgressBar;
