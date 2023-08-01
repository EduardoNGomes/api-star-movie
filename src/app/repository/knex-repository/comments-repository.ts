import { knex } from '@/db/knexfile'
import { CommentProps, CommentRepository } from '../comment-repository'
import { randomUUID } from 'crypto'

export class KnexCommentsRepository implements CommentRepository {
  async create(data: CommentProps) {
    const commentsToCreate = {
      id: randomUUID(),
      ...data,
    }
    const comments = await knex('comments')
      .insert(commentsToCreate)
      .returning('*')
      .first()

    return comments
  }

  async delete(id: string) {
    await knex('comments').where({ id }).delete()
    return 'deleted'
  }

  async findByMovieId(id: string) {
    const comments = await knex('comments').where({ movie_id: id })

    return comments
  }
}
