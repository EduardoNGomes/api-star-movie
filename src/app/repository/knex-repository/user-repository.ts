import { knex } from '@/db/knexfile'
import { UserProps, UserRepository, UserUpdateProps } from '../user-repository'
import { randomUUID } from 'crypto'
import { AppError } from '@/app/utils/App-error'

export class KnexUserRepository implements UserRepository {
  async createUser(data: UserProps) {
    try {
      const userToCreate = {
        id: randomUUID(),
        ...data,
      }
      const user = await knex('users').insert(userToCreate).returning('*')
      return user[0]
    } catch (error) {
      console.log(error)
      throw new AppError('database error', 500)
    }
  }

  async updateUser(id: string, data: UserUpdateProps) {
    try {
      const user = await knex('users').where({ id }).update(data).returning('*')

      return user[0]
    } catch (error) {
      console.log(error)
      throw new AppError('database error', 500)
    }
  }

  async findByUserId(id: string): Promise<UserProps | null> {
    try {
      const user = await knex('users').where({ id }).first()

      return user
    } catch (error) {
      console.log(error)
      throw new AppError('database error', 500)
    }
  }

  async findByUserEmail(email: string): Promise<UserProps | null> {
    try {
      const user = await knex('users').where({ email }).first()
      return user
    } catch (error) {
      console.log(error)
      throw new AppError('database error', 500)
    }
  }
}
