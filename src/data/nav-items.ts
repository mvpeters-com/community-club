import {NavItem} from '~/components/types';

export const NAV_ITEMS: NavItem[] = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: "home",
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: "users",
    }
] as const;