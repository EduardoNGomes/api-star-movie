import { describe, beforeEach, it, expect } from 'vitest'
import { UserService } from '../user-service'
import { InMemoryUserRepository } from '@/app/repository/in-memory-repository/in-memory-user-repository'
import { randomUUID } from 'crypto'
import { AppError } from '@/app/utils/App-error'

let inMemoryUserRepository: InMemoryUserRepository
let userService: UserService

describe('Authenticate User', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    userService = new UserService(inMemoryUserRepository)

    await userService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
    })
  })

  it('should authenticate user', async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { user } = await userService.authenticate(
      'johndoe@example.com',
      'mysecretpassword',
    )

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
  })

  it('shouldnt authenticate user with invalid email', async () => {
    await expect(() =>
      userService.authenticate(randomUUID(), '12345'),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('shouldnt authenticate user with invalid paswword', async () => {
    await expect(() =>
      userService.authenticate('johndoe@example.com', '12345'),
    ).rejects.toBeInstanceOf(AppError)
  })
})
