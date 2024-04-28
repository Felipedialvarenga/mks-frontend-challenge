import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./global.css";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "MKS Frontend Challenge",
  description: "MKS Frontend Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
