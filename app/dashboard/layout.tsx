import Header from '@/components/dashboard/layout/header';
import type { Metadata } from 'next';
import { Slide, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: 'Efood',
  description: 'Order food online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className='flex flex-col'>
      <Header />
      <main className='flex flex-row p-4 px-6 w-[500px] !max-w-full mx-auto gap-6'>
        {children}
      </main>
      <ToastContainer
        className="!rounded-md !overflow-hidden !w-max !max-w-[90%]"
        bodyClassName="!pr-3"
        position="bottom-center"
        autoClose={5000}
        transition={ Slide }
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        pauseOnFocusLoss
        theme="dark"
      />
    </div>
  );

};