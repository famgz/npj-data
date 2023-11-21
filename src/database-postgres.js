import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class DatabasePostgres {
    async list(search = '') {
        let users

        if (search) {
            users = await sql`
                SELECT *
                FROM users
                WHERE nome ilike ${'%' + search + '%'}
            `
        }
        else {
            users = await sql`
                SELECT *
                FROM users
            `
        }
        return users
    }

    async create(user) {
        const {
            nome,
            estado_civil,
            profissao,
            renda,
            data_nascimento,
            naturalidade,
            rg,
            cpf,
            endereco_completo,
            cep,
            email,
            natureza_lide
        } = user

        // console.log(user)

        let docMatches = await sql`
            SELECT *
            FROM users
            WHERE cpf = ${cpf}
            AND rg = ${rg};
        `

        let userExists = docMatches.length

        if(userExists) {
            throw new Error('User already exists');
        }

        const userId = randomUUID()

        await sql`
            INSERT INTO users
            (
                id, 
                nome,
                estado_civil,
                profissao,
                renda,
                data_nascimento,
                naturalidade,
                rg,
                cpf,
                endereco_completo,
                cep,
                email,
                natureza_lide
            )
            VALUES (
                ${userId},
                ${nome},
                ${estado_civil},
                ${profissao},
                ${renda},
                ${data_nascimento},
                ${naturalidade},
                ${rg},
                ${cpf},
                ${endereco_completo},
                ${cep},
                ${email},
                ${natureza_lide}
            );
        `
    }

    async update(id, user) {
        const {
            nome,
            estado_civil,
            profissao,
            renda,
            data_nascimento,
            naturalidade,
            rg,
            cpf,
            endereco_completo,
            cep,
            email,
            natureza_lide,
        } = user

        await sql`
            UPDATE users
            SET 
                nome = ${nome},
                estado_civil = ${estado_civil},
                profissao = ${profissao},
                renda = ${renda},
                data_nascimento = ${data_nascimento},
                naturalidade = ${naturalidade},
                rg = ${rg},
                cpf = ${cpf},
                endereco_completo = ${endereco_completo},
                cep = ${cep},
                email = ${email},
                natureza_lide = ${natureza_lide}
            WHERE id = ${id}
        `
    }

    async delete(id) {
        await sql`
            DELETE from users
            WHERE id = ${id}
        `
    }
}
