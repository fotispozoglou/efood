import type { Metadata } from 'next';
import '../globals.css';
import Providers from './providers'

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
    <Providers>
      <main className='flex flex-col'>{children}</main>
    </Providers>
  );

};