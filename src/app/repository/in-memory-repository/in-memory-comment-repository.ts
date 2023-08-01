import { randomUUID } from 'crypto'
import { CommentProps, CommentRepository } from '../comment-repository'

export class InMemoryCommentRepository implements CommentRepository {
  items: CommentProps[] = []

  async create(data: CommentProps) {
    const dataToCreate = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.items.push(dataToCreate)

    return dataToCreate
  }

  async delete(id: string) {
    const listWithoutComments = this.items.filter(
      (comment) => comment.id !== id,
    )

    this.items = listWithoutComments

    return 'deleted'
  }

  async findByMovieId(movie_id: string) {
    const comment = this.items.filter(
      (comment) => (comment.movie_id = movie_id),
    )

    return comment
  }
}
