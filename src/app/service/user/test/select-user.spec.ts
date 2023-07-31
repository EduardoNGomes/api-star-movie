import { describe, beforeEach, it, expect } from 'vitest'
import { UserService } from '../user-service'
import { InMemoryUserRepository } from '@/app/repository/in-memory-repository/in-memory-user-repository'
import { randomUUID } from 'crypto'

let inMemoryUserRepository: InMemoryUserRepository
let userService: UserService

describe('Create User', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    userService = new UserService(inMemoryUserRepository)
  })

  it('should create a new user', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
    }

    const { user } = await userService.createUser(mockUser)

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
  })

  it('shouldnt create a new user because this use has exist', async () => {
    const userExist = await inMemoryUserRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    })

    await expect(() =>
      userService.createUser(userExist),
    ).rejects.toBeInstanceOf(Error)
  })
})
