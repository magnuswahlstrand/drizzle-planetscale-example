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
    console.log('Add user', name)
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


main()
    .then(() => {
        console.log("Success!")
    })
    .catch(err => {
        console.log("Error", err)
    })