import type { Metadata } from 'next';
import '../globals.css';

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
    <main>{children}</main>
  );
}
