import "~/styles/globals.css";

import {TRPCReactProvider} from "~/trpc/react";

import {Inter as FontSans} from "next/font/google"

import {cn} from "~/lib/utils"
import Sidebar from '~/components/layout/Sidebar';
import Header from '~/components/layout/Header';
import useTranslation from 'next-translate/useTranslation';
import {Toaster} from '~/components/ui/sonner';
import {api} from '~/trpc/server';

import {ClerkProvider} from '@clerk/nextjs';

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata = {
    title: "Community Club",
    description: "Community Club is a platform for communities to connect and share ideas.",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

const iconMap: Record<string, string> = {
    events: "calendar",
    discussion: "message-circle",
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const {lang} = useTranslation('common')
    const spaces = await api.space.getAll.query();

    const navItems = spaces.map(space => ({
        title: `${space.name}`,
        href: `/${space.type}/${space.slug}`,
        icon: iconMap[space.type!],
    }));

    return <ClerkProvider>
        <html lang={lang}>
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}>
        <TRPCReactProvider>
            <Header navItems={navItems}/>
            <div className="flex h-screen overflow-hidden">
                <Sidebar navItems={navItems}/>

                <main className="w-full pt-16">{children}</main>
            </div>
        </TRPCReactProvider>
        <Toaster/>
        </body>
        </html>
    </ClerkProvider>
}
