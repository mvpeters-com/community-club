import {cn} from "~/lib/utils";
import NavItems from '~/components/layout/NavItems';
import {type NavItem} from '~/types';

interface SidebarProps {
    title?: string,
    navItems: NavItem[];
}

export default function Sidebar({navItems, title}: SidebarProps) {
    return (
        <nav
            className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
        >
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {title && <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                            {title}
                        </h2>}

                        <NavItems items={navItems}/>
                    </div>
                </div>
            </div>
        </nav>
    );
}