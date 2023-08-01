export interface CommentProps {
  id?: string
  movie_id: string
  user_id: string
  description: string
  created_at: Date
  updated_at: Date
  movie_rating: number
}

export interface CommentRepository {
  create(data: CommentProps): Promise<CommentProps>

  delete(id: string): Promise<string>

  findByMovieId(id: string): Promise<CommentProps[] | []>
}
