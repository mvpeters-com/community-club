"use client";

import {UserButton, useUser} from '@clerk/nextjs';

export function AdminUserNav() {
    const {
        isSignedIn
    } = useUser()

    if (isSignedIn) {
        return (
            <UserButton afterSignOutUrl='/'/>
        );
    }
}