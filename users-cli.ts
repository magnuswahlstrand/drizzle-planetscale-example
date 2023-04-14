import {addUserToDb, listUsersFromDb} from "./db";

function usage() {
    console.log("Usage:");
    console.log("  users-db-cli.ts --list       - fetch all users");
    console.log("  users-db-cli.ts --add <name> - add a user");
    process.exit(1);
}

async function main() {
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


const padding = 10

async function listUsers() {
    const users = await listUsersFromDb();
    // Print users
    console.log('ID'.padEnd(padding), 'Name')
    console.log('-----'.padEnd(padding), '-----')
    for (const u of users) {
        const paddedId = u.id.toString().padEnd(padding)
        console.log(paddedId, u.name)
    }
}

async function addUser(name: string) {
    await addUserToDb(name)
    console.log(`Added user ${name}!`)
}


main()
    .then(() => {
        console.log("Success!")
    })
    .catch(err => {
        console.log("Error", err)
    })