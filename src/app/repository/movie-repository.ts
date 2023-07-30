export interface MovieProps {
  id: string
  name: string
  created_at: string
  email: string
  password: string
  threads_url?: string
  twitter_url?: string
  tiktok_url?: string
  instagram_url?: string
}

export interface MovieRepository {
  createMovie({created_at,email,id,instagram_url,name,password,threads_url,tiktok_url,twitter_url}:MovieProps): Promise<MovieProps> 

  readAllMovie(): Promise<MovieProps[]>

  findMovieById(id:string): Promise<MovieProps>

  updateMovie({created_at,email,id,instagram_url,name,password,threads_url,tiktok_url,twitter_url}:MovieProps): Promise<MovieProps>

  deleteMovie(id:string): Promise<void>
}