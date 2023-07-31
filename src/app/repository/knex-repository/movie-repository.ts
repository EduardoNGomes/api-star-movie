import { knex } from '@/db/knexfile'
import { MovieProps, MovieRepository } from '../movie-repository'
import { randomUUID } from 'crypto'

export class KnexMovieRepository implements MovieRepository {
  async createMovie(movieData: MovieProps) {
    const movieToCreate = {
      id: randomUUID(),
      ...movieData,
    }
    const dataResp = await knex('movies')
      .insert(movieToCreate)
      .returning('*')
      .first()
    return dataResp
  }

  async readAllMovie() {
    const dataResp = await knex('movies')
    return dataResp
  }

  async findMovieById(id: string) {
    const dataResp = await knex('movies').where({ id }).first()
    return dataResp
  }

  async updateMovie(movieData: MovieProps) {
    const dataResp = await knex('movies')
      .update(movieData)
      .where({ id: movieData.id })
      .returning('*')
      .first()
    return dataResp
  }

  async deleteMovie(id: string) {
    await knex('movies').where({ id }).delete()
  }
}
