import Link from "next/link";

import {UserNav} from "./userNav";
import {MobileSidebar} from '~/components/layout/MobileSidebar';
import {cn} from "~/lib/utils";
import {type NavItem} from '~/types';

interface HeaderProps {
    homeUrl?: string;
    navItems?: NavItem[];
}

export default function Header({
                                   homeUrl = '/',
                                   navItems,
                               }: HeaderProps) {
    return (
        <div
            className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
            <nav className="h-14 flex items-center justify-between px-4">
                <div className="hidden lg:block">
                    <Link
                        href={homeUrl}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path
                                d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
                        </svg>
                    </Link>
                </div>
                {navItems && <div className={cn("block lg:!hidden")}>
                  <MobileSidebar navItems={navItems}/>
                </div>}

                <div className="flex items-center gap-2">
                    <UserNav/>
                </div>
            </nav>
        </div>
    );
}