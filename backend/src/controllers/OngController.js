/** Conexão com o banco de dados */
const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },
    async create(request, response) {
        /** Recebendo a requisição do form */
        const {
            name,
            email,
            whatsapp,
            city,
            uf
        } = request.body;

        /** Gerando o ID criptografado */
        const id = crypto.randomBytes(4).toString('HEX');
        /** Aguardando o insert */
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        /** Resposta depois do Insert */
        return response.json({
            id
        });
    }
}