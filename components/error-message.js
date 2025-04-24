import { TriangleIcon } from 'lucide-react'
import React from 'react'

const ErrorMessage = ({error}) => {
  return (
    <div className='flex w-full items-center p-4 mb-4 gap-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
      <TriangleIcon className='w-4 h-4 text-red-500' />
      <span className='sr-only'>Error</span>
      <div>{error}</div>
    </div>
  )
}

export default ErrorMessage