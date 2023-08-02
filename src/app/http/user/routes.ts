import { Router } from 'express'
import multer from 'multer'
import {
  authenticateUser,
  createUser,
  selectUser,
  selectUserByEmail,
  updateUser,
} from './User.controller'
import { verifyUserAuthenticated } from '@/app/middlewares/verify-user-is-authenticated'
import { MULTER } from '@/app/configs/multer'

const userRouter = Router()
const upload = multer(MULTER)

userRouter.post('/', createUser)
userRouter.post('/session', authenticateUser)

// authenticate routes
userRouter.get('/', verifyUserAuthenticated, selectUser)
userRouter.put('/', verifyUserAuthenticated, upload.single('image'), updateUser)
userRouter.post('/selectUser', verifyUserAuthenticated, selectUserByEmail)

export { userRouter }
