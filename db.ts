import {connect} from "@planetscale/database";
import {usersTable} from "./schema";
import {drizzle} from "drizzle-orm/planetscale-serverless";

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