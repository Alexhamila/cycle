import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import ProgressBar from '@/components/utils/ProgressBar';

export default function Layout({
  children,
  withoutMenus = false,
  progressBar = false,
}: {
  children: React.ReactNode;
  withoutMenus?: boolean;
  progressBar?: boolean;
}) {
  // Put Header or Footer Here
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      {!withoutMenus && <Header />}
      {progressBar && <ProgressBar />}
      {children}
      {!withoutMenus && <Footer />}
    </>
  );
}
