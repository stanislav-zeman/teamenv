import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/app/providers/AuthProvider'
import ThemeProvider, { getPaletteFromLS } from '@/app/providers/ThemeProvider'
import AdaptiveBackground from '@/components/AdaptiveBackground'
import StylableClerkProvider from '@/app/providers/StylableClerkProvider'
import Header from '@/components/header'
import ReactQueryProvider from './providers/ReactQueryProvider'
import { ClientChakraProvider } from './providers/ClientChakraProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <StylableClerkProvider>
          <AuthProvider>
            <html lang="en">
              <body className={inter.className}>
                <ClientChakraProvider>
                  <Header />
                  <AdaptiveBackground>{children}</AdaptiveBackground>
                </ClientChakraProvider>
              </body>
            </html>
          </AuthProvider>
        </StylableClerkProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}
