import {events, spaces} from "./schema";
import {faker} from "@faker-js/faker";
import * as dotenv from "dotenv";
import {add} from 'date-fns'
import {drizzle} from 'drizzle-orm/vercel-postgres';
import {createClient} from '@vercel/postgres';
import {slugify} from '~/lib/utils';
import {eq} from 'drizzle-orm';

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

    for (let i = 0; i < 5; i++) {
        const name = faker.lorem.words(1);
        data.push({
            name,
            slug: slugify(name),
            type: faker.helpers.arrayElement(['events', 'discussion']),
        });
    }

    await db.insert(spaces).values(data);

    await Promise.all((await db.select().from(spaces).where(eq(spaces.type, 'events')))
        .map(async (space) => {
            const eventsData: (typeof events.$inferInsert)[] = [];

            for (let i = 0; i < 5; i++) {
                const name = faker.lorem.words(1);
                const startDate = add(new Date(), {days: i});

                const endDate = add(startDate, {
                    hours: faker.number.int({min: 1, max: 2}),
                });

                eventsData.push({
                    name,
                    slug: slugify(name),
                    description: faker.lorem.words(20),
                    cover: faker.image.url(),
                    startDate,
                    endDate,
                    isOnline: faker.datatype.boolean(),
                    location: faker.location.city(),
                    spaceID: space.id,
                });
            }

            await db.insert(events).values(eventsData);
        }));

    await client.end();

    console.log('done seeding')
};

await main();