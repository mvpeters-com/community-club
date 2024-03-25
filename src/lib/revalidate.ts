"use server";

import {revalidateTag, revalidatePath} from 'next/cache';

export const serverRevalidateTag = (tag: string) => {
    revalidateTag(tag);
}

export const serverRevalidatePath = (path: string) => {
    revalidatePath(path);
}