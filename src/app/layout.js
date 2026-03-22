import './globals.css';
import MainLayout from '@/components/layout/MainLayout';
import { AuthProvider } from '@/components/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
