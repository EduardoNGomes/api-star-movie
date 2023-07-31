import { describe, beforeEach, it, expect } from 'vitest'
import { UserService } from '../user-service'
import { InMemoryUserRepository } from '@/app/repository/in-memory-repository/in-memory-user-repository'
import { randomUUID } from 'crypto'

let inMemoryUserRepository: InMemoryUserRepository
let userService: UserService

describe('Update User', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    userService = new UserService(inMemoryUserRepository)
  })

  it('should create a new user', async () => {
    await inMemoryUserRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    })

    const mockUserUpdate = {
      id: randomUUID(),
      name: 'John Doe Updated',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const { user } = await userService.updateUser(mockUserUpdate)

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe Updated',
        email: 'johndoe@example.com',
      }),
    )
  })

  it('shouldnt create a new user because this use has exist', async () => {
    await inMemoryUserRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    })

    const mockUserUpdate = {
      id: randomUUID(),
      name: 'John Doe Updated',
      email: 'johndoeFailed@example.com',
      password: 'mysecretpassword',
      created_at: new Date(),
      updated_at: new Date(),
    }

    await expect(() =>
      userService.updateUser(mockUserUpdate),
    ).rejects.toBeInstanceOf(Error)
  })
})
