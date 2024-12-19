import { Inter } from 'next/font/google';
import './globals.css';
import EnvironmentSwitcher from '@/components/key-management/EnvironmentSwitcher';
import { MainNav } from './_components/MainNav';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { cn } from '@/lib/utils';
import { SystemLangageSwitcher } from './_components/SystemLangageSwitcher';
import { ContentWrapper } from './_components/ContentWrapper';
import { DarkModeToggle } from './_components/DarkModeToggle';
import { Metadata } from 'next';
import { ProviderWrapper } from '@/components/helpers/ProviderWrapper';
import { LogQueriesToggle } from './_components/LogQueriesToggle';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

if (process.env.NODE_ENV !== 'production') {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export const metadata: Metadata = {
  title: 'Experience Edge Browser',
  icons: '/favicon.png',
  description:
    'An interactive UI for browsing data on Sitecore Experience Edge.  Created by Horizontal Digital.',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={cn(inter.className, 'h-full', 'm-0')}>
      <body className={cn(inter.className, 'h-full', 'm-0')}>
        <div className="flex flex-col h-full">
          <ProviderWrapper>
            <div className="border-b flex-initial flex items-center px-8">
              <div className="flex h-16 items-center">
                <EnvironmentSwitcher />
                <MainNav className="mx-6" />
              </div>
              <div className="ml-auto flex items-center space-x-4">
                <span> EE Browser </span>
              </div>

              <div className="ml-auto flex items-center space-x-4">
                <LogQueriesToggle />

                <SystemLangageSwitcher />

                <DarkModeToggle />
              </div>
            </div>
            <div className="space-y-4 p-8 pt-6 flex flex-col flex-auto overflow-y-auto">
              <ContentWrapper>{children}</ContentWrapper>
            </div>
            <footer
              className={cn(
                'px-8',
                'py-4',
                'px-gutter-all',
                'text-theme-text',
                'relative',
                'bg-gray-dark',
                'text-white',
                'flex-initial',
                'basis-1'
              )}
            >
              <div className={cn('sm:flex', 'sm:flex-wrap', 'pr-8', 'lg:pr-0')}>
                <div className="w-full">
                  <p className={cn('text-sm', 'my-0')}>
                    &nbps;
                  </p>
                </div>
              </div>
            </footer>
          </ProviderWrapper>
        </div>
      </body>
    </html>
  );
}
