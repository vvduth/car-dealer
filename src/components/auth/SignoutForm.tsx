"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2, LogOut } from 'lucide-react'
import { signOutAction } from '@/app/_actions/sign-out'


const SignOutButton = () => {
    
    const {pending} = useFormStatus()
    return (
        <Button
            type='submit'
            disabled={pending}
            variant={"outline"}
            size={"icon"}
        >
            {pending ? (
                <Loader2 className='h-4 w-4 animate-spin'/>
            ):(
                <LogOut className="w-6 h-6 text-destructive" />
            )}
        </Button>
    )
}
const SignoutForm = () => {
  return (
    <div>
      <form action={signOutAction}>
        <SignOutButton/>
      </form>
    </div>
  )
}

export default SignoutForm
