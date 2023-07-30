import { MovieProps, MovieRepository } from "../movie-repository";

const knex = require('knex');
const knexConf = require('../../db/knexfile');
const connect = knex(knexConf.development);


export class KnexMovieRepository implements MovieRepository{    

    createMovie = async ({created_at,email,id,name,password,instagram_url,threads_url,tiktok_url,twitter_url}:MovieProps) => {
        const dataResp = await connect('filmes').insert({created_at,email,id,name,password,instagram_url,threads_url,tiktok_url,twitter_url});
        return dataResp;
    }
    
    readAllMovie = async() => {
        const dataResp = await connect('filmes');
        return dataResp;
    }
    
    findMovieById = async(id:string) => {
        
        const dataResp = await connect('filmes').where({id});
        return dataResp;
    }
    
    updateMovie = async ({created_at,email,id,name,password,instagram_url,threads_url,tiktok_url,twitter_url}:MovieProps) => {
        const dataResp = await connect('filmes').update(created_at,email,name,password,instagram_url,threads_url,tiktok_url,twitter_url).where({id})
        return dataResp;
    }
    
    deleteMovie = async (id:string) => {
        const dataResp = await connect('filmes').update({status: 0}).where({id});
        return dataResp;
    }

}

