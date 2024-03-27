import {type NavItem} from '~/types';

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
    },
     {
        title: "Spaces",
        href: "/admin/spaces",
        icon: "spaces",
    }
] as const;