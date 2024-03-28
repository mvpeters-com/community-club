"use client";

import {UserButton, useUser} from '@clerk/nextjs';

export function UserNav() {
    const {
        isSignedIn
    } = useUser()

    if (isSignedIn) {
        return (
            <UserButton afterSignOutUrl='/'/>
        );
    }
}