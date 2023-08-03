import { InMemoryCommentRepository } from '@/app/repository/in-memory-repository/in-memory-comment-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CommentService } from '../comment-service'
import { InMemoryMovieRepository } from '@/app/repository/in-memory-repository/in-memory-movie-repository'
import { InMemoryUserRepository } from '@/app/repository/in-memory-repository/in-memory-user-repository'

let MockMovieRepository: InMemoryMovieRepository
let MockUserRepository: InMemoryUserRepository
let inMemoryCommentRepository: InMemoryCommentRepository
let commentService: CommentService

describe('Create Comment', () => {
  beforeEach(async () => {
    MockMovieRepository = new InMemoryMovieRepository()
    MockUserRepository = new InMemoryUserRepository()

    inMemoryCommentRepository = new InMemoryCommentRepository()
    commentService = new CommentService(
      inMemoryCommentRepository,
      MockMovieRepository,
    )

    MockUserRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
    })

    MockMovieRepository.createMovie({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user_id: MockUserRepository.item[0].id!,
      title: 'The Adventure Begins',
      age: 12,
      image: 'https://example.com/movies/adventure.jpg',
      sinopse: 'Join the thrilling adventure of a lifetime.',
    })
  })

  it('should to create a comment', async () => {
    const commentToCreate = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      movie_id: MockMovieRepository.items[0].id!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user_id: MockUserRepository.item[0].id!,
      description: 'Ótimo filme! Recomendo a todos!',
      rating_movie: 10,
    }

    const { comment } = await commentService.createComment(commentToCreate)

    expect(comment).toEqual(
      expect.objectContaining({
        description: 'Ótimo filme! Recomendo a todos!',
        movie_rating: 10,
      }),
    )
  })
})
