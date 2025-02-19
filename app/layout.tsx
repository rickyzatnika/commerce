import type { Metadata } from "next";
import { Lato } from 'next/font/google'
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME, APP_SLOGAN } from '@/lib/constants'
import ClientProviders from "@/components/shared/client-providers";
import ChatButton from "@/components/shared/chatbot/chatButton";



const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
})


export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME}. ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
  other: {
    'google': 'notranslate', // Mencegah Google Translate otomatis
  }
}

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <body className={`${lato.className} antialiased `}>
        <ClientProviders >
          {children}
          <ChatButton />
        </ClientProviders>
      </body>
    </html>
  );
}
