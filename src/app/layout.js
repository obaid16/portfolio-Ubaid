import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Obaidullah Shaikh - AI/ML Student & Figma UI/UX Designer',
  description: 'I\'m a Figma specialist who combines the power of AI/ML with user-centered design to create beautiful, intelligent interfaces. Currently mastering modern web technologies while crafting exceptional user experiences.',
  keywords: ['UI/UX Design', 'Figma', 'AI/ML', 'Web Development', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Obaidullah Shaikh' }],
  creator: 'Obaidullah Shaikh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com',
    title: 'Obaidullah Shaikh - AI/ML Student & Figma UI/UX Designer',
    description: 'I\'m a Figma specialist who combines the power of AI/ML with user-centered design to create beautiful, intelligent interfaces.',
    siteName: 'Obaidullah Shaikh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Obaidullah Shaikh - AI/ML Student & Figma UI/UX Designer',
    description: 'I\'m a Figma specialist who combines the power of AI/ML with user-centered design to create beautiful, intelligent interfaces.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}