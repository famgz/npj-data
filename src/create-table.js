import { sql } from './db.js'

// sql`
//     DROP table if exists users;
// `.then(() => {
//     console.log('table `users` deleted')
// })

sql`
    CREATE TABLE users (
        id                 UUID PRIMARY KEY,
        nome               TEXT,
        estado_civil       TEXT,
        profissao          TEXT,
        renda              TEXT,
        data_nascimento    TEXT,
        naturalidade       TEXT,
        RG                 TEXT UNIQUE,
        CPF                TEXT UNIQUE,
        endereco_completo  TEXT,
        CEP                TEXT,
        email              TEXT,
        natureza_lide      TEXT
    );
`.then(() => {
    console.log('Table succesfully created!')
})
