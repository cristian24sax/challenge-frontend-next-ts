import type { Metadata } from 'next';

import Header from '@/components/headers/headers';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Gestion de productos',
  description: 'creación y administración de productos',
};
interface MainLayoutProps {
  readonly children: ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
