import type { Metadata } from "next";
import { TokenProvider } from "@/context/token";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "판다마켓",
  description: "일상의 모든 물건을 거래해보세요",
  icons: { icon: "/icon.png", shortcut: "/icon.png" },
  metadataBase: new URL("http://localhost:3000/"),
  openGraph: {
    title: "판다마켓",
    description: "일상의 모든 물건을 거래해보세요",
    images: "/icon.png",
    url: "http://localhost:3000/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <TokenProvider>
        <body
          className="min-h-screen font-pretendard text-[--color-gray800]"
        >
          {children}
          <Toaster toastOptions={{ success: {style: { fontSize: "16px" }}, error: {style: { fontSize: "16px" }} }} />
        </body>
      </TokenProvider>
    </html>
  );
}
