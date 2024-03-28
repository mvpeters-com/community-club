// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
    index,
    pgTableCreator,
    serial,
    timestamp,
    boolean,
    varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `community-club_${name}`);

export const spaces = createTable(
    "space",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", {length: 256}),
        slug: varchar("slug", {length: 256}),
        type: varchar("type", {length: 256}),
        createdAt: timestamp("created_at")
            .notNull().defaultNow(),
        updatedAt: timestamp("updated_at")
    },
    (example) => ({
        nameIndex: index("name_idx").on(example.name),
    })
);

export const events = createTable("event", {
    id: serial("id").primaryKey(),
    name: varchar("title", {length: 256}).notNull(),
    slug: varchar("slug", {length: 256}),
    description: varchar("description", {length: 1024}).notNull(),
    image: varchar("image", {length: 512}),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date"),
    isOnline: boolean('boolean'),
    location: varchar("location", {length: 512}),
    spaceID: serial("space_id")
        .notNull()
        .references(() => spaces.id),
});

export type Space = typeof spaces.$inferSelect;
export type Event = typeof events.$inferSelect;