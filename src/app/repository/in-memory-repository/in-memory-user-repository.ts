import { randomUUID } from 'crypto'
import { UserProps, UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  item: UserProps[] = []

  async createUser(data: UserProps) {
    const dataToCreate: UserProps = {
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      ...data,
    }
    this.item.push(dataToCreate)

    return dataToCreate
  }

  async updateUser(data: UserProps) {
    const updatedUser = this.item.filter((user) =>
      user.id === data.id ? data : user,
    )

    this.item = updatedUser

    return data
  }

  async findByUserId(id: string) {
    const user = this.item.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByUserEmail(email: string) {
    const user = this.item.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
