import Header from './Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>CGPA CALCULATOR</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
