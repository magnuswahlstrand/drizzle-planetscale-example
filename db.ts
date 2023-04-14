import {drizzle} from 'drizzle-orm/planetscale-serverless';

import {connect} from '@planetscale/database';

import {usersTable} from "./schema";

const connection = connect({
    // host: Config.PLANETSCALE_HOST,
    // username: Config.PLANETSCALE_USERNAME,
    // password: Config.PLANETSCALE_PASSWORD,
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