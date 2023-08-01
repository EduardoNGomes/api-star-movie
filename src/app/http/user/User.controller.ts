import { KnexUserRepository } from '@/app/repository/knex-repository/user-repository'
import { UserService } from '@/app/service/user/user-service'
import { AppError } from '@/app/utils/App-error'
import { Request, Response } from 'express'
import { z } from 'zod'

const userRepository = new KnexUserRepository()

const userService = new UserService(userRepository)

const createUser = async (req: Request, res: Response) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { email, name, password } = bodySchema.parse(req.body)
  try {
    const { user } = await userService.createUser({ email, name, password })
    return res.status(201).json(user)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

// const selectUser = async (req: Request, res: Response) => {
//   const bodySchema = z.object({
//     id: z.string().uuid(),
//   })

//   const { email, name, password } = bodySchema.parse(req.body)
//   try {
//     const { user } = await userService.createUser({ email, name, password })
//     return res.status(201).json(user)
//   } catch (error) {
//     if (error instanceof AppError) {
//       return res.status(error.statusCode).json(error.message)
//     } else {
//       return res.status(500).json({ message: 'internal error' })
//     }
//   }
// }
export { createUser }
