import { UserProps, UserRepository } from '@/app/repository/user-repository'

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: UserProps) {
    if (data.id) {
      const userExists = await this.userRepository.findByUserId(data.id)

      if (userExists) {
        throw new Error(`User already exists`)
      }
    }

    const user = await this.userRepository.createUser(data)

    return { user }
  }
}
