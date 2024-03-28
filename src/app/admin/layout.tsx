import "~/styles/globals.css";

import {TRPCReactProvider} from "~/trpc/react";

import {Inter as FontSans} from "next/font/google"

import {cn} from "~/lib/utils"
import Sidebar from '~/components/layout/Sidebar';
import Header from '~/components/layout/Header';
import {ClerkProvider} from '@clerk/nextjs';
import useTranslation from 'next-translate/useTranslation';
import {Toaster} from '~/components/ui/sonner';
import type {NavItem} from '~/types';

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata = {
    title: "Community Club",
    description: "Community Club is a platform for communities to connect and share ideas.",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

const NAV_ITEMS: NavItem[] = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: "home",
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: "users",
    },
    {
        title: "Spaces",
        href: "/admin/spaces",
        icon: "spaces",
    }
] as const;

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const {lang} = useTranslation('common')
    const {t} = useTranslation('admin')

    return <ClerkProvider>
        <html lang={lang}>
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}>
        <TRPCReactProvider>
            <Header navItems={NAV_ITEMS}/>
            <div className="flex h-screen overflow-hidden">
                <Sidebar title={t('title')} navItems={NAV_ITEMS}/>
                <main className="w-full pt-16">{children}</main>
            </div>
        </TRPCReactProvider>
        <Toaster/>
        </body>
        </html>
    </ClerkProvider>
}
