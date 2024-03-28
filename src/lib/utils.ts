import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function range(start: number, end: number) {
    return Array.from({length: end - start}, (_, i) => start + i)
}

export function slugify(text: string): string {
    return text
        .toString()                           // Cast to string (optional)
        .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
        .toLowerCase()                  // Convert the string to lowercase letters
        .trim()                                  // Remove whitespace from both sides of a string (optional)
        .replace(/\s+/g, '-')            // Replace spaces with -
        .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}