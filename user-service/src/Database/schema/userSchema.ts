import { boolean, integer, pgTable, time, timestamp, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar().notNull(),
  lastName: varchar(),
  email: varchar().notNull().unique(),
  password: varchar().notNull(),
  emailVerified: boolean().default(false),
  createdAt: timestamp("created_at",{withTimezone:true}).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
     .notNull()
     .defaultNow(),
})
