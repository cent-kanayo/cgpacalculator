import Header from './Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />
        <title>CGPA CALCULATOR</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
