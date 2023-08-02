import { Router } from 'express'
import {
  authenticateUser,
  createUser,
  selectUser,
  selectUserByEmail,
  updateUser,
} from './User.controller'
import { verifyUserAuthenticated } from '@/app/middlewares/verify-user-is-authenticated'

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.post('/session', authenticateUser)

// authenticate routes
userRouter.get('/', verifyUserAuthenticated, selectUser)
userRouter.put('/', verifyUserAuthenticated, updateUser)
userRouter.post('/selectUser', verifyUserAuthenticated, selectUserByEmail)

export { userRouter }
