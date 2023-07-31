import { UserProps, UserRepository } from '@/app/repository/user-repository'

import { hash } from 'bcryptjs'

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: UserProps) {
    const userExists = await this.userRepository.findByUserEmail(data.email)

    if (userExists) {
      throw new Error(`User already exists`)
    }

    const dataToCreated = {
      ...data,
      password: await hash(data.password, 6),
    }

    const user = await this.userRepository.createUser(dataToCreated)

    return { user }
  }

  async updateUser(data: UserProps) {
    const userExists = await this.userRepository.findByUserEmail(data.email)

    if (!userExists) {
      throw new Error(`User data invalid`)
    }
    const user = await this.userRepository.updateUser(data)

    return { user }
  }

  async selectUser(id: string) {
    const user = await this.userRepository.findByUserId(id)

    if (!user) {
      throw new Error('User inexists')
    }

    return { user }
  }
}
