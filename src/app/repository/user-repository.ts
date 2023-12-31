export interface UserProps {
  id?: string
  name: string
  created_at?: Date
  updated_at?: Date
  image?: string
  email: string
  password: string
  threads_url?: string
  twitter_url?: string
  tiktok_url?: string
  instagram_url?: string
}

export interface UserUpdateProps {
  name: string
  image?: string
  threads_url?: string
  twitter_url?: string
  tiktok_url?: string
  instagram_url?: string
}

export interface UserRepository {
  createUser(data: UserProps): Promise<UserProps>

  updateUser(id: string, data: UserUpdateProps): Promise<UserProps>

  findByUserId(id: string): Promise<UserProps | null>

  findByUserEmail(email: string): Promise<UserProps | null>
}
