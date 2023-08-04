export interface MovieProps {
  id?: string
  user_id: string
  user_name?: string
  title: string
  age: number
  image: string
  sinopse: string
  rating?: number
  comment_count?: number
  created_at?: Date
  updated_at?: Date
}

export interface MovieRepository {
  createMovie(movieData: MovieProps): Promise<MovieProps>

  readAllMovie(): Promise<MovieProps[]>

  findMovieById(id: string): Promise<MovieProps | null>

  deleteMovie(id: string, user_id: string): Promise<string>
}
