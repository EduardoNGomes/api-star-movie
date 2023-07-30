import { randomUUID } from 'crypto';
import FilmesRepository from '../../repository/knex-repository/movie-repository';
const filmesRepository = new FilmesRepository();

export class MovieService {

    createMovie = async (body) => {
       const idFilme = randomUUID();
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
    
    readAllMovies = async() => {
        const response = await filmesRepository.readAllFilmes();
        return response;
    }
    
    findMovieById = async(id) => {
       const response = await filmesRepository.findFilmeById(id);
       return response;
    }
    
    updateMovie = async(id, body) => {
        const response = await filmesRepository.updateFilme(id, body);
        return response;
    }
    
    deleteMovie = async(id:string ) => {
        const response = await filmesRepository.deleteFilme(id)
        return response;
    }

}
