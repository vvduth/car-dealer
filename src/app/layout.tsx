import type { Metadata } from "next";
import "./globals.css";
import { Mulish, Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const mulish = Mulish({
	weight: "variable",
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
});

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});
export const metadata: Metadata = {
  title: "RIM GLOBAL",
  description: "Federal Way's Curated Automotive Collection",};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en" suppressHydrationWarning>
      <body
				className={cn(
					"antialiased bg-background font-heading",
					roboto.variable,
					mulish.variable,
				)}
			>
        <NextTopLoader showSpinner={true} />
        <NuqsAdapter>
            <Suspense>
                {children}
            </Suspense>
        </NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}