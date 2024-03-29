import {unstable_noStore as noStore} from "next/cache";
import Link from "next/link";

import {api} from "~/trpc/server";

export default async function Home() {
    noStore();

    return (
        <main className={'p-4'}>
           <h1>Home</h1>
        </main>
    );
}

