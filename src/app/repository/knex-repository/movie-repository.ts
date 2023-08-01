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

  async updateMovie(id: string, rating: number, comment_count: number) {
    const dataResp = await knex('movies')
      .update({ rating, comment_count })
      .where({ id })
      .returning('*')
      .first()
    return dataResp
  }

  async deleteMovie(id: string) {
    await knex('movies').where({ id }).delete()
    return 'deleted'
  }
}
