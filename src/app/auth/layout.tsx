import React from 'react';
import { AuthHeader } from '@/components/Header';
import Link from 'next/link';
import { P } from '@/components/Typography';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => (
  <React.Fragment>
    <div className='flex-grow flex flex-col justify-between my-4'>
      <div className='w-full'>
        <AuthHeader />
      </div>
      <div>
        {children}
      </div>
      <div className='text-center px-10 w-full'>
        <P>If you are having trouble logging in, email us at <Link href='mailto:contact@findyourtutor.co.uk'>contact@findyourtutor.co.uk</Link> or <Link href='/contact-us'>contact us</Link>.</P>
      </div>
    </div>
  </React.Fragment>
)

export default AuthLayout;