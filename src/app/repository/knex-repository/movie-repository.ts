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
    try {
      const dataResp = await knex('movies')
        .select(
          'movies.id',
          'movies.user_id',
          'movies.title',
          'movies.age',
          'movies.sinopse',
          'movies.image',
          'movies.created_at',
          'movies.updated_at',
          'users.name as user_name',
        )
        .innerJoin('users', 'users.id', 'movies.user_id')
      return dataResp
    } catch (error) {
      console.log(error)
      throw new AppError('database error: ', 409)
    }
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
