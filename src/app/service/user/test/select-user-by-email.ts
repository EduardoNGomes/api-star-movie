import { describe, beforeEach, it, expect } from 'vitest'
import { UserService } from '../user-service'
import { InMemoryUserRepository } from '@/app/repository/in-memory-repository/in-memory-user-repository'
import { UserProps } from '@/app/repository/user-repository'
import { AppError } from '@/app/utils/App-error'

let inMemoryUserRepository: InMemoryUserRepository
let userService: UserService

let userMock: UserProps

describe('Select User', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    userService = new UserService(inMemoryUserRepository)

    userMock = await inMemoryUserRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
    })
  })

  it('should select user', async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { userResponse } = await userService.selectUserByEmail(userMock.email)

    expect(userResponse).toEqual(
      expect.objectContaining({
        name: 'John Doe',
      }),
    )
  })

  it('shouldnt select user with invalid email', async () => {
    await expect(() =>
      userService.selectUser('inexistent@example.com'),
    ).rejects.toBeInstanceOf(AppError)
  })
})
