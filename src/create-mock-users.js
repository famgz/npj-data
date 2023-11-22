import { DatabasePostgres } from "./database-postgres.js";
import fs from 'fs';

function readJSON(filePath) {
    let object
    try {
        const data = fs.readFileSync(filePath);
        object = JSON.parse(data)
    }
    catch (err) {
        console.error(`Error reading the file: ${filePath}`, err)
    }
    return object
}

async function logUsers(users) {
    for(const [id, data] of Object.entries(users)) {
        await database.create(data)
        console.log('User ${data.name} logged in database')
    }
}

const database = new DatabasePostgres()

const filePath = 'data/users.json';

let mockUsers = readJSON(filePath)

console.log(typeof mockUsers)

for(const [id, data] of Object.entries(mockUsers)) {
    console.log(data)
}

logUsers(mockUsers)
