import {drizzle} from 'drizzle-orm/planetscale-serverless';

import {int, mysqlTable, text, timestamp} from "drizzle-orm/mysql-core";

import {connect} from '@planetscale/database';

// Schemas
export const usersTable = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(),
    name: text('name').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
});

// DB things
const connection = connect({
    host: "aws.connect.psdb.cloud",
    username: process.env.PLANETSCALE_USERNAME,
    password: process.env.PLANETSCALE_PASSWORD,
});

export const db = drizzle(connection);

export async function addUserToDb(name: string) {
    await db.insert(usersTable)
        .values({name})
}

export async function listUsersFromDb() {
    return db
        .select()
        .from(usersTable)
}

// Main
function usage() {
    console.log("Usage:");
    console.log("  users-db-cli.ts --list       - fetch all users");
    console.log("  users-db-cli.ts --add <name> - add a user");
    process.exit(1);
}

async function listUsers() {
    console.log('List users')
}

async function addUser(name: string) {
    await addUserToDb(name)
    console.log(`Added user ${name}!`)
}

export async function main() {
    if (process.argv.length < 3) {
        usage();
    }

    const flag = process.argv[2];
    const value = process.argv[3];

    if (flag === "--add" && value) {
        await addUser(value);
    } else if (flag === "--list") {
        await listUsers();
    } else {
        usage();
    }
}


main()
    .then(() => {
        console.log("Success!")
    })
    .catch(err => {
        console.log("Error", err)
    })