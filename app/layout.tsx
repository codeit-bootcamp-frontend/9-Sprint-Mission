import Navbar from "@/components/navbar/Navbar";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | 판다마켓",
    default: "판다마켓",
  },
  description: "일상의 모든 물건을 거래해보세요",
  icons: { icon: "/icons/logo.png", shortcut: "/icons/logo.png" },
  metadataBase: new URL("https://codeit-nextjs-mission.netlify.app/"),
  openGraph: {
    title: {
      template: "%s | 판다마켓",
      default: "판다마켓",
    },
    description: "일상의 모든 물건을 거래해보세요",
    images: "/icons/logo.png",
    url: "https://codeit-nextjs-mission.netlify.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="text-panda-gray800">
        <QueryProvider>
          <Navbar />
          {children}
          <Toaster
            toastOptions={{
              success: { style: { fontSize: "14px" } },
              error: { style: { fontSize: "14px" } },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
