import SignInform from '@/components/auth/SignInform'
import React from 'react'

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background">
      <SignInform/>
    </div>
  )
}

export default SignInPage