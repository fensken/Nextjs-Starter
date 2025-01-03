import React from "react";
import localFont from "next/font/local";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "src/app/api/uploadthing/core";

import RouteProgressBar from "src/providers/RouteProgressBar";
import { ThemeProvider } from "src/providers/ThemeProvider";

import { Toaster } from "src/components/ui/sonner";

import { Header } from "src/components/global/Header";
import { Footer } from "src/components/global/Footer";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Next.Js Starter Kit",
  description:
    "Build faster, scale smarter, and create amazing web experiences with our powerful and flexible Next.js template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RouteProgressBar>
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />

            {children}

            <Toaster position="bottom-center" />
          </RouteProgressBar>
        </ThemeProvider>
      </body>
    </html>
  );
}
