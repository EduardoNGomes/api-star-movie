const knex = require('knex');
const knexConf = require('../../db/knexfile');
const connect = knex(knexConf.development);

class FilmesRepository {    

    createFilme = async (data) => {
        const dataResp = await connect('filmes').insert(data);
        return dataResp;
    }
    
    readAllFilmes = async() => {
        const dataResp = await connect('filmes');
        return dataResp;
    }
    
    findFilmeById = async(idFilme) => {
        
        const dataResp = await connect('filmes').where({id: idFilme});
        return dataResp;
    }
    
    updateFilme = async (id, body) => {
        const dataResp = await connect('filmes').update(body).where({id})
        return dataResp;
    }
    
    deleteFilme = async (id) => {
        const dataResp = await connect('filmes').update({status: 0}).where({id});
        return dataResp;
    }

}

module.exports = FilmesRepository
