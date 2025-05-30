'use client'
import React, {useState} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signInSchema } from '@/lib/zod'
import LoadingButton from '@/components/loading-button'
import { handleCredentialsSignIn, handleGithubSignin } from '../../actions/authActions'
import ErrorMessage from '@/components/error-message'
import {Button} from '@/components/ui/button';
import { GitHubLogoIcon } from "@radix-ui/react-icons";
// import {GoogleLogoIcon} from "@radix-ui/react-icons";

const SignIn = () => {
  const [globalError, setGlobalError] = useState("")

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values) => {
    try {
      const result = await handleCredentialsSignIn(values?.email, values.password);
      if (result?.message) {
          setGlobalError(result.message);
      }
  } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error);
  }
  }


  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          {globalError && ( <ErrorMessage error={globalError} /> )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} placeholder='Enter your email' autoComplete="off" />
                      {/* <FormMessage>{field.error}</FormMessage> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} placeholder='Enter your password' />
                      {/* <FormMessage>{field.error}</FormMessage> */}
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                )}
              />
              <LoadingButton pending={form.formState.isSubmitting}/>
            </form>
          </Form>

          <span className='text-sm text-gray-500 text-center block my-2'>
            or
          </span>

          <form className='w-full' action={handleGithubSignin}>
            <Button variant="outline" className="w-full" type="submit">
              <GitHubLogoIcon className="h-4 w-4 mr-2"/> Sign in with GitHub
            </Button>
          </form>

          <span className='text-sm text-gray-500 text-center block my-2'>
            or
          </span>
{/* 
          <form className='w-full' action={handleGithubSignin}>
            <Button variant="outline" className="w-full" type="submit">
              <GoogleLogoIcon className="h-4 w-4 mr-2"/> Sign in with Google
            </Button>
          </form> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default SignIn