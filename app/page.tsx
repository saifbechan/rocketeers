import { type Metadata } from 'next';

import Contact from '@/components/Contact';
import Rocketeers from '@/components/Rocketeers';

export const metadata: Metadata = {
  title: 'Rocketeers 🚀',
  description:
    'Using a genetic algorithm these rocketeers will find their path across the galaxy.',
  twitter: {
    card: 'summary_large_image',
    title: 'Rocketeers 🚀',
    description:
      'Using a genetic algorithm these rocketeers will find their way across the galaxy.',
    creator: '@saifbechan',
    images: [
      {
        url: 'https://rocketeers.saifbechan.me/images/preview.webp',
        width: 1280,
        height: 640,
        alt: 'Rocketeers website preview',
      },
    ],
  },
  openGraph: {
    url: 'https://rocketeers.saifbechan.me',
    title: 'Rocketeers 🚀',
    description:
      'Using a genetic algorithm these rocketeers will find their way across the galaxy.',
    images: [
      {
        url: 'https://rocketeers.saifbechan.me/images/preview.webp',
        width: 1280,
        height: 640,
        alt: 'Rocketeers website preview',
      },
    ],
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <main>
        <Rocketeers />
      </main>
      <footer>
        <Contact />
      </footer>
    </>
  );
}
