/**
 * Root layout — Next.js App Router requires this file to exist, but with
 * locale-prefixed routing (middleware redirects every request to /<locale>/...)
 * the real chrome (html/body, providers, header/footer) lives in
 * `src/app/[locale]/layout.tsx`. This shell just passes children through.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
