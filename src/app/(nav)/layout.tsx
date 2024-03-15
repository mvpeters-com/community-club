import "~/styles/globals.css";

import {TRPCReactProvider} from "~/trpc/react";
import {Inter as FontSans} from "next/font/google"

import {cn} from "~/lib/utils"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata = {
    title: "Community Club",
    description: "Community Club is a platform for communities to connect and share ideas.",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}>
        <TRPCReactProvider>
            {children}
        </TRPCReactProvider>
        </body>
        </html>
    );
}
