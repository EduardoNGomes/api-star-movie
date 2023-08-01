import { UserProps, UserRepository } from '@/app/repository/user-repository'
import { AppError } from '@/app/utils/App-error'

import { compare, hash } from 'bcryptjs'

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: UserProps) {
    const userExists = await this.userRepository.findByUserEmail(data.email)

    if (userExists) {
      throw new AppError(`User already exists`, 409)
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
      throw new AppError(`User data invalid`, 409)
    }
    const user = await this.userRepository.updateUser(data)

    return { user }
  }

  async selectUser(id: string) {
    const user = await this.userRepository.findByUserId(id)

    if (!user) {
      throw new AppError('User inexists', 409)
    }

    return { user }
  }

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findByUserEmail(email)

    if (!user) {
      throw new AppError(`User data invalid`, 409)
    }

    const validPassword = await compare(password, user.password)

    if (!validPassword) {
      throw new AppError(`User data invalid`, 409)
    }

    return { user }
  }
}
