import React from 'react';
import '../styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Simple Notes App',
  description: 'A simple notes app built with Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 