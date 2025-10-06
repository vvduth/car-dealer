import React, { PropsWithChildren } from 'react'
import Header from './header'
import PublicFooter from './footer'
import { ThemeProvider } from "./theme-provider";

const PublicLayout = ({children}: PropsWithChildren) => {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <Header />
      <main className='bg-background'>
        {children}
      </main>
      <PublicFooter />
    </ThemeProvider>
  )
}

export default PublicLayout
