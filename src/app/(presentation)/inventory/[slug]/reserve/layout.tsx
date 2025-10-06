import React, { PropsWithChildren } from 'react'

const MultiStepFormLayout = (
    {children}: PropsWithChildren
) => {
  return (
    <main className='max-w-4xl mx-auto p-6 sm:p-8 md:p-10'>
        {children}
    </main>
  )
}

export default MultiStepFormLayout