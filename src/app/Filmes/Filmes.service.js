const FilmesRepository = require('./Filmes.repository');
const filmesRepository = new FilmesRepository();
const { v4: uuidv4 } = require('uuid');

class FilmesService {

    createFilme = async (body) => {
       const idFilme = uuidv4();
       const datAtual = Date.now();
       const data = {
        'id': idFilme,
        'descr': body.descr,
        'ano': body.ano,
        'sinopse': body.sinopse,
        'imagem': body.imagem,
        'criado_por': body.criado_por
        }
       const response = await filmesRepository.createFilme(data);
       return response;
    }
    
    readAllFilmes = async() => {
        const response = await filmesRepository.readAllFilmes();
        return response;
    }
    
    findFilmeById = async(id) => {
       const response = await filmesRepository.findFilmeById(id);
       return response;
    }
    
    updateFilme = async(id, body) => {
        const response = await filmesRepository.updateFilme(id, body);
        return response;
    }
    
    deleteFilme = async(id) => {
        const response = await filmesRepository.deleteFilme(id)
        return response;
    }

}

module.exports = FilmesService