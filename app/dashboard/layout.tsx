import Header from '@/components/dashboard/layout/header';
import type { Metadata } from 'next';

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
      <main className='flex flex-row p-4 px-6'>
        {children}
      </main>
    </div>
  );

};