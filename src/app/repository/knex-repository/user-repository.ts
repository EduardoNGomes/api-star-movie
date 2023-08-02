import { knex } from '@/db/knexfile'
import { UserProps, UserRepository, UserUpdateProps } from '../user-repository'
import { randomUUID } from 'crypto'

export class KnexUserRepository implements UserRepository {
  async createUser(data: UserProps) {
    const userToCreate = {
      id: randomUUID(),
      ...data,
    }
    const user = await knex('users').insert(userToCreate).returning('*')
    return user[0]
  }

  async updateUser(id: string, data: UserUpdateProps) {
    const user = await knex('users')
      .where({ id })
      .update(data)
      .returning('*')
      .first()

    return user
  }

  async findByUserId(id: string): Promise<UserProps | null> {
    const user = await knex('users').where({ id }).first()

    return user
  }

  async findByUserEmail(email: string): Promise<UserProps | null> {
    const user = await knex('users').where({ email }).first()
    return user
  }
}
