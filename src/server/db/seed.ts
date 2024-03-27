import {events, spaces} from "./schema";
import {faker} from "@faker-js/faker";
import * as dotenv from "dotenv";

import {drizzle} from 'drizzle-orm/vercel-postgres';
import { createClient } from '@vercel/postgres';

dotenv.config({path: "./.env"});

const main = async () => {
     const client = createClient({
         connectionString: process.env.POSTGRES_URL_NON_POOLING,
     });
  await client.connect();

    const db = drizzle(client);

    const data: (typeof spaces.$inferInsert)[] = [];

    for (let i = 0; i < 20; i++) {
        data.push({
            name: faker.lorem.words(1),
        });
    }

    console.log("Seed start");
    await db.insert(spaces).values(data);
    console.log("Seed done");
};

await main();