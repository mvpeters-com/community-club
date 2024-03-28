import {events, spaces} from "./schema";
import {faker} from "@faker-js/faker";
import * as dotenv from "dotenv";

import {drizzle} from 'drizzle-orm/vercel-postgres';
import {createClient} from '@vercel/postgres';
import {slugify} from '~/lib/utils';

dotenv.config({path: "./.env"});

const main = async () => {
    const client = createClient({
        connectionString: process.env.POSTGRES_URL_NON_POOLING,
    });

    await client.connect();

    const db = drizzle(client);

    await db.delete(events);
    await db.delete(spaces);

    const data: (typeof spaces.$inferInsert)[] = [];

    for (let i = 0; i < 2; i++) {
        const name = faker.lorem.words(2);
        data.push({
            name,
            slug: slugify(name),
            type: 'events',
        });
    }

    await db.insert(spaces).values(data);
    console.log('done seeding')
};

await main();

process.exit();