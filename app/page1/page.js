'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

const PageOne = () => {
  const { data: session, update } = useSession()
  console.log(session)
  return (
    <div>
      <button
        onClick={() => {
          session?.user && update({ ...session.user, name: 'M.M.BAPIN' })
        }}
      >Update Session</button>
      <h1>All User</h1>
    </div>
  )
}

export default PageOne