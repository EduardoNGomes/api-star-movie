import { knex } from '@/db/knexfile'
import { MovieProps, MovieRepository } from '../movie-repository'
import { randomUUID } from 'crypto'
import { AppError } from '@/app/utils/App-error'

export class KnexMovieRepository implements MovieRepository {
  async createMovie(movieData: MovieProps) {
    try {
      const movieToCreate = {
        id: randomUUID(),
        ...movieData,
      }

      const [dataResp] = await knex('movies')
        .insert(movieToCreate)
        .returning('*')
      return dataResp
    } catch (error) {
      console.log(error)
      throw new AppError('database error: ', 409)
    }
  }

  async readAllMovie() {
    const dataResp = await knex('movies')
    return dataResp
  }

  async findMovieById(id: string) {
    const dataResp = await knex('movies').where({ id }).first()
    return dataResp
  }

  async deleteMovie(id: string, user_id: string) {
    try {
      await knex('movies').where({ id }).andWhere({ user_id }).delete()
      return 'deleted'
    } catch (error) {
      console.log(error)
      throw new AppError('database error: ', 409)
    }
  }
}
