import { knex } from '@/db/knexfile'
import { CommentProps, CommentRepository } from '../comment-repository'
import { randomUUID } from 'crypto'
import { AppError } from '@/app/utils/App-error'

export class KnexCommentsRepository implements CommentRepository {
  async create(data: CommentProps) {
    try {
      const commentsToCreate = {
        id: randomUUID(),
        ...data,
      }
      const comments = await knex('comments')
        .insert(commentsToCreate)
        .returning('*')

      return comments[0]
    } catch (error) {
      console.log(error)
      throw new AppError('database error: ', 409)
    }
  }

  async delete(id: string, user_id: string) {
    await knex('comments').where({ id }).andWhere({ user_id }).delete()
    return 'deleted'
  }

  async findByMovieId(id: string) {
    try {
      const comments = await knex('comments')
        .select(
          'comments.id',
          'comments.description',
          'comments.rating_movie',
          'users.email',
          'users.image',
          'users.name',
        )
        .where({ movie_id: id })
        .innerJoin('users', 'comments.user_id', 'users.id')

      return comments
    } catch (error) {
      console.log(error)
      throw new AppError('database error: ', 409)
    }
  }
}
