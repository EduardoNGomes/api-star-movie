import { beforeEach, describe, expect, it } from 'vitest'
import { MovieService } from '../movie-service'
import { InMemoryUserRepository } from '@/app/repository/in-memory-repository/in-memory-user-repository'
import { InMemoryMovieRepository } from '@/app/repository/in-memory-repository/in-memory-movie-repository'
import { randomUUID } from 'crypto'
import { UserProps } from '@/app/repository/user-repository'
import { AppError } from '@/app/utils/App-error'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryMovieRepository: InMemoryMovieRepository

let movieService: MovieService

let userMock: UserProps

describe('Create Movie', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryMovieRepository = new InMemoryMovieRepository()

    movieService = new MovieService(
      inMemoryMovieRepository,
      inMemoryUserRepository,
    )

    userMock = await inMemoryUserRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    })
  })

  it('should create a movie', async () => {
    const movieToCreate = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user_id: userMock.id!,
      title: 'The Adventure Begins',
      age: 12,
      image: 'https://example.com/movies/adventure.jpg',
      sinopse: 'Join the thrilling adventure of a lifetime.',
    }
    const { movie } = await movieService.createMovie(movieToCreate)

    expect(movie).toEqual(
      expect.objectContaining({
        title: 'The Adventure Begins',
      }),
    )
  })

  it('shouldnt create a movie because user inexist', async () => {
    const movieToCreate = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user_id: randomUUID(),
      title: 'The Adventure Begins',
      age: 12,
      image: 'https://example.com/movies/adventure.jpg',
      sinopse: 'Join the thrilling adventure of a lifetime.',
    }

    await expect(
      async () => await movieService.createMovie(movieToCreate),
    ).rejects.toBeInstanceOf(AppError)
  })
})
