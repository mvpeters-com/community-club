import {type Icons} from '~/components/Icons';

export interface User {
    id: string;
    email: string | undefined;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    isAdmin: boolean;
}

export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
}