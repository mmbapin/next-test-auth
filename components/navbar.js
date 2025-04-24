// 'use client'
import React from 'react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
// import { useSession } from 'next-auth/react';
import { auth } from '@/auth';
import { handleSignOut } from '@/app/actions/authActions';

const Navbar = async () => {
  // const { data: session } = useSession();
  const session = await auth();
  // console.log(session)
  return (
    <nav className='flex items-center justify-between p-4 bg-white shadow-sm'>
      <Link href='/' className='text-lg font-bold'>
        Auth.js
      </Link>
      {!session ? (
        <Link href='/auth/signin'>
        <Button variant='default' className='text-sm'>
          Sign In
        </Button>
      </Link>
      ) : (
        <form action={handleSignOut}>
          <Button variant='default' type='submit'>
            Sign Out
          </Button>
        </form>
      )}
      

      
    </nav>
  )
}

export default Navbar