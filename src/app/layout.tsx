import "./globals.css";
import { Providers } from "./providers";
import { Fira_Code } from "next/font/google";

interface metadata {
  title: string;
  description: string;
}

const fira = Fira_Code({
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="en" className={fira.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
