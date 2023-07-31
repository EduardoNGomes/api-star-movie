export interface UserProps {
  id?: string
  name: string
  created_at?: Date
  updated_at?: Date
  email: string
  password: string
  threads_url?: string
  twitter_url?: string
  tiktok_url?: string
  instagram_url?: string
}

export interface UserRepository {
  createUser(data: UserProps): Promise<UserProps>

  updateUser(data: UserProps): Promise<UserProps>

  findByUserId(id: string): Promise<UserProps | null>

  findByUserEmail(email: string): Promise<UserProps | null>
}
