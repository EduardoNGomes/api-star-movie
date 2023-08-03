import {
  CommentProps,
  CommentRepository,
} from '@/app/repository/comment-repository'

export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async createComment(data: CommentProps) {
    const comment = await this.commentRepository.create(data)

    return { comment }
  }

  async selectAll(movie_id: string) {
    const comments = await this.commentRepository.findByMovieId(movie_id)

    return { comments }
  }

  async delete(id: string) {
    const msg = await this.commentRepository.delete(id)

    return { msg }
  }
}
