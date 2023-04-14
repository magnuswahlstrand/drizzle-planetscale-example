



### Initialize the project
First of all, let's initialize our repo
```bash
mkdir drizzle-planetscale-example
cd drizzle-planetscale-example
npm init -y
npm install typescript ts-node @types/node
npx tsc --init
```

### Code
Next we create a basic cli application

2. Create **users-cli.ts**
```ts
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
```

#### Test run

```
> npx ts-node users-cli.ts --add magnus

Add user magnus
Success!
```

### Setup Planetscale

* First, install the planetscale database driver
```
npm install @planetscale/database
```
* Go to https://app.planetscale.com/ and sign up.
* Follow the instructions to initialize the planetscale CLI and connect to your database.
* Now we can connect to our database **(magnusscale)** and create to our table
```
> pscale shell magnusscale main
magnusscale/main>
```

Create our users table
```mysql
CREATE TABLE
    users
(
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Done!

### Setup drizzle-orm

1. Install drizzle-orm and the mysql2 driver
```
npm i drizzle-orm mysql2
```

2. Create **schema.ts**
```ts
import {int, mysqlTable, text, timestamp} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(),
    name: text('name').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
});
```

3. Create **db.ts**
```ts
import {drizzle} from 'drizzle-orm/planetscale-serverless';

import {connect} from '@planetscale/database';

import {productsTable} from "./db_schema";

const connection = connect({
    host: Config.PLANETSCALE_HOST,
    username: Config.PLANETSCALE_USERNAME,
    password: Config.PLANETSCALE_PASSWORD,
});

export const db = drizzle(connection);

export async function insertProduct(
    product_id: string, brand_id: string, articles: string[], full_payload: object) {
    await db.insert(productsTable)
        .values({
            product_id,
            brand_id,
            articles,
            full_payload,
        })
}

export async function listProducts() {
    return db
        .select()
        .from(productsTable)
}
```