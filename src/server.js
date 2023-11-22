import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// upload user
server.post('/users', async (request, reply) => {
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
        natureza_lide } = request.body

    await database.create({
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
    })

    return reply.status(201).send()  // 201 -> something was created
})

// get users
server.get('/users', async (request) => {
    const search = request.query.search
    const users = await database.list(search)
    return users
})

// update user info
server.put('/users/:id', async (request, reply) => {
    const userId = request.params.id
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
    } = request.body

    await database.update(userId, {
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
    })

    return reply.status(204).send()  // 204 = success without content
})

// delete user
server.delete('/users/:id', async (request, reply) => {
    const userId = request.params.id

    await database.delete(userId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})
