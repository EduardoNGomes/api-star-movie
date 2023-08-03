import { Router } from 'express'

import { verifyUserAuthenticated } from '@/app/middlewares/verify-user-is-authenticated'

import { createComment } from './Comment.controller'

const commentRouter = Router()

commentRouter.post('/:id', verifyUserAuthenticated, createComment)

export { commentRouter }
