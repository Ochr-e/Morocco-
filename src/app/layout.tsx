// Root layout — redirects handled by middleware (next-intl)
// The actual HTML shell is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
