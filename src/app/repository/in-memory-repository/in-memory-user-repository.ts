import { randomUUID } from 'crypto'
import { UserProps, UserRepository, UserUpdateProps } from '../user-repository'

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

  async updateUser(id: string, data: UserUpdateProps) {
    const updateIndex = this.item.findIndex((user) => user.id === id)
    const updatedUser = this.item.map((user) =>
      user.id === id ? { ...user, ...data, updated_at: new Date() } : user,
    )

    this.item = updatedUser

    return this.item[updateIndex]
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
