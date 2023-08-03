import {
  CommentProps,
  CommentRepository,
} from '@/app/repository/comment-repository'
import { MovieRepository } from '@/app/repository/movie-repository'

export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private movieRepository: MovieRepository,
  ) {}

  async createComment(data: CommentProps) {
    const comment = await this.commentRepository.create(data)

    const movie = await this.movieRepository.findMovieById(data.movie_id)

    const newMovieRating = movie?.rating
      ? movie?.rating + data.rating_movie
      : data.rating_movie

    const newMovieCommentCount = movie?.comment_count
      ? movie.comment_count + 1
      : 1

    await this.movieRepository.updateMovie(
      data.movie_id,
      newMovieRating,
      newMovieCommentCount,
    )

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
