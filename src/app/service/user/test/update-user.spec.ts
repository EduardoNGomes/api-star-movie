import { describe, beforeEach, it, expect } from 'vitest'
import { UserService } from '../user-service'
import { InMemoryUserRepository } from '@/app/repository/in-memory-repository/in-memory-user-repository'
import { randomUUID } from 'crypto'
import { AppError } from '@/app/utils/App-error'

let inMemoryUserRepository: InMemoryUserRepository
let userService: UserService

describe('Update User', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    userService = new UserService(inMemoryUserRepository)

    await inMemoryUserRepository.createUser({
      name: 'John Doe2',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    })
    await inMemoryUserRepository.createUser({
      name: 'John Doe2',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    })
  })

  it('should update user', async () => {
    const userCreateResponse = await inMemoryUserRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
      id: '123',
      created_at: new Date(),
      updated_at: new Date(),
    })

    const mockUserUpdate = {
      name: 'John Doe Updated',
      threads_url: 'test-threads',
      twitter_url: 'test-twitter',
      tiktok_url: 'test-tiktok',
      instagram_url: 'test-instagram',
    }

    if (typeof userCreateResponse.id !== 'string') {
      return
    }

    const { user } = await userService.updateUser('123', mockUserUpdate)

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe Updated',
        threads_url: 'test-threads',
        twitter_url: 'test-twitter',
        tiktok_url: 'test-tiktok',
        instagram_url: 'test-instagram',
      }),
    )
  })

  it('shouldnt update user with wrong email', async () => {
    await inMemoryUserRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
      id: '123',
      created_at: new Date(),
      updated_at: new Date(),
    })

    const mockUserUpdate = {
      name: 'John Doe Updated',
      updated_at: new Date(),
      threads_url: 'test-threads',
      twitter_url: 'test-twitter',
      tiktok_url: 'test-tiktok',
      instagram_url: 'test-instagram',
    }

    await expect(() =>
      userService.updateUser(randomUUID(), mockUserUpdate),
    ).rejects.toBeInstanceOf(AppError)
  })
})
