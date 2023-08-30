const { Client } = require('pg');

module.exports = {
    maybeCreateTables: async () => {
        const client = new Client({
          host:     'localhost',
          port:     5432,
          database: 'postgres',
          user: 'postgres',
          password: 'LeroySaxSafe1!'
        });
        await client.connect();

        client.query(`
            CREATE TABLE IF NOT EXISTS objects (
                id serial PRIMARY KEY,
                displayName VARCHAR ( 256 ) NOT NULL,
                description VARCHAR ( 4096 ),
                image BYTEA,
                tagIds integer[]
            )`
        );

        client.query(`
            CREATE TABLE IF NOT EXISTS objects (
                id serial PRIMARY KEY,
                displayName VARCHAR ( 256 ) NOT NULL,
                description VARCHAR ( 4096 ),
                image BYTEA,
                tagIds integer[]
            )`
        );

        client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id serial PRIMARY KEY,
                name VARCHAR ( 256 ) NOT NULL
            )`
        );
    }
};