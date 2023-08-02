import {
  UserProps,
  UserRepository,
  UserUpdateProps,
} from '@/app/repository/user-repository'
import { AppError } from '@/app/utils/App-error'
import { DiskStorage } from '@/app/utils/Disk-Storage'

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

  async updateUser(id: string, data: UserUpdateProps) {
    const userExists = await this.userRepository.findByUserId(id)

    if (!userExists) {
      throw new AppError(`User data invalid`, 409)
    }
    const diskStorage = new DiskStorage()

    if (userExists.image && data.image) {
      await diskStorage.deleteFile(userExists.image)
    }

    const user = await this.userRepository.updateUser(id, data)

    return { user }
  }

  async selectUser(id: string) {
    const user = await this.userRepository.findByUserId(id)

    if (!user) {
      throw new AppError('User inexists', 409)
    }

    return { user }
  }

  async selectUserByEmail(email: string) {
    const user = await this.userRepository.findByUserEmail(email)

    if (!user) {
      throw new AppError(`User data invalid`, 409)
    }

    const userResponse = {
      name: user.name,
      image: user.image,
      threads_url: user.threads_url,
      twitter_url: user.twitter_url,
      tiktok_url: user.tiktok_url,
      instagram_url: user.instagram_url,
    }

    return { userResponse }
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
