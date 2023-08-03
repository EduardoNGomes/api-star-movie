import { Router } from 'express'

import { verifyUserAuthenticated } from '@/app/middlewares/verify-user-is-authenticated'

import { createComment, deleteComment } from './Comment.controller'

const commentRouter = Router()

commentRouter.post('/:id', verifyUserAuthenticated, createComment)
commentRouter.delete('/:id', verifyUserAuthenticated, deleteComment)

export { commentRouter }
