import { Router } from 'express'
import { authenticateUser, createUser, selectUser } from './User.controller'
import { verifyUserAuthenticated } from '@/app/middlewares/verify-user-is-authenticated'

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.post('/session', authenticateUser)

// authenticate routes
userRouter.get('/:id', verifyUserAuthenticated, selectUser)

export { userRouter }
