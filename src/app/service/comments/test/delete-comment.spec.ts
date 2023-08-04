/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { InMemoryCommentRepository } from '@/app/repository/in-memory-repository/in-memory-comment-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CommentService } from '../comment-service'
import { InMemoryMovieRepository } from '@/app/repository/in-memory-repository/in-memory-movie-repository'
import { InMemoryUserRepository } from '@/app/repository/in-memory-repository/in-memory-user-repository'
import { UserProps } from '@/app/repository/user-repository'

let MockMovieRepository: InMemoryMovieRepository
let MockUserRepository: InMemoryUserRepository
let inMemoryCommentRepository: InMemoryCommentRepository
let commentService: CommentService

let userMock: UserProps

describe('Create Comment', () => {
  beforeEach(async () => {
    MockMovieRepository = new InMemoryMovieRepository()
    MockUserRepository = new InMemoryUserRepository()

    inMemoryCommentRepository = new InMemoryCommentRepository()
    commentService = new CommentService(inMemoryCommentRepository)

    userMock = await MockUserRepository.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mysecretpassword',
    })

    MockMovieRepository.createMovie({
      user_id: MockUserRepository.item[0].id!,
      title: 'The Adventure Begins',
      age: 12,
      image: 'https://example.com/movies/adventure.jpg',
      sinopse: 'Join the thrilling adventure of a lifetime.',
    })

    inMemoryCommentRepository.create({
      movie_id: MockMovieRepository.items[0].id!,
      user_id: MockUserRepository.item[0].id!,
      description: 'Ótimo filme! Recomendo a todos!',
      rating_movie: 5,
    })
  })

  it('should to delete a comment', async () => {
    const { comments } = await commentService.selectAll(
      MockMovieRepository.items[0].id!,
    )

    expect(comments).toHaveLength(1)

    const { msg } = await commentService.delete(
      inMemoryCommentRepository.items[0].id!,
      userMock.id!,
    )

    expect(msg).toEqual('deleted')

    const { comments: newCommentList } = await commentService.selectAll(
      MockMovieRepository.items[0].id!,
    )
    expect(newCommentList).toHaveLength(0)
  })
})
