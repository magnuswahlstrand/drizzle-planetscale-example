import {int, mysqlTable, text, timestamp} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable('products', {
    id: int('id').autoincrement().primaryKey(),
    name: text('name').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
});
