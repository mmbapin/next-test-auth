import React from 'react';
import { Button } from '@/components/ui/button';

const LoadingButton = ({pending}) => {
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? (
        <div className="spinner-border text-primary-foreground" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : 'Sign In'}
    </Button>
  )
}

export default LoadingButton