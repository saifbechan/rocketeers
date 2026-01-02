import { jura } from '@/lib/fonts';

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${jura.variable} antialiased`} lang="en">
      <head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
        <link
          href="/favicon.ico"
          rel="icon"
          sizes="64x64 32x32 24x24 16x16"
          type="image/x-icon"
        />
        <link href="/logo192.png" rel="apple-touch-icon" />

        <meta charSet="utf-8" />
        <meta content="#141526" name="theme-color" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          content="react, typescript, javascript, p5js, github, nextjs, machine learning, genetic algorithm"
          name="keywords"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
