import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from '../components/NavBar';
import SessionAuthProvider from '@/context/SessionAuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anuncios de segunda mano',
  description: 'Anuncios de segunda mano',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        
        <NavBar/>
        <SessionAuthProvider>
        {children}
        </SessionAuthProvider>
      </body>
    </html>
  )
}
