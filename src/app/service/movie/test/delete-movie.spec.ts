import { beforeEach, describe, expect, it } from 'vitest'
import { MovieService } from '../movie-service'
import { InMemoryUserRepository } from '@/app/repository/in-memory-repository/in-memory-user-repository'
import { InMemoryMovieRepository } from '@/app/repository/in-memory-repository/in-memory-movie-repository'
import { randomUUID } from 'crypto'
import { UserProps } from '@/app/repository/user-repository'
import { MovieProps } from '@/app/repository/movie-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryMovieRepository: InMemoryMovieRepository

let movieService: MovieService

let userMock: UserProps
let movieMock: MovieProps

describe('select Movie', () => {
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

    movieMock = await inMemoryMovieRepository.createMovie({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user_id: userMock.id!,
      title: 'The Adventure Begins',
      age: 12,
      image: 'https://example.com/movies/adventure.jpg',
      sinopse: 'Join the thrilling adventure of a lifetime.',
    })
  })

  it('should select all movies', async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { message } = await movieService.deleteMovie(movieMock.id!)
    expect(message).toEqual('deleted')
  })
})
