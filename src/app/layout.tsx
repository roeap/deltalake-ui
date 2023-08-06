import "./globals.css";
import { Providers } from "./providers";

interface metadata {
  /**
   * Page title
   */
  title: string;
  description: string;
}

export const metadata = {
  title: "Deltalake Explorer",
  description: "A utility for exploring tables maintained in a Deltalake.",
};

/**
 * RootLayout component
 * Wraps the entire application with the necessary providers
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
