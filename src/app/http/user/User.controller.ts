import { KnexUserRepository } from '@/app/repository/knex-repository/user-repository'
import { UserService } from '@/app/service/user/user-service'
import { AppError } from '@/app/utils/App-error'
import { Request, Response } from 'express'
import { z } from 'zod'
import { jwtConfigAuth } from '@/app/configs/auth'
import { sign } from 'jsonwebtoken'

const userRepository = new KnexUserRepository()

const userService = new UserService(userRepository)

const createUser = async (req: Request, res: Response) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(8),
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

const selectUser = async (req: Request, res: Response) => {
  if (!req.user?.sub) {
    return res.status(401).json({ message: 'JWT invalid' })
  }
  try {
    const { user } = await userService.selectUser(req.user.sub)
    return res.status(200).json(user)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

const selectUserByEmail = async (req: Request, res: Response) => {
  const bodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = bodySchema.parse(req.body)
  try {
    const { userResponse } = await userService.selectUserByEmail(email)
    return res.status(200).json(userResponse)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

const authenticateUser = async (req: Request, res: Response) => {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = bodySchema.parse(req.body)

  try {
    const { user } = await userService.authenticate(email, password)

    const { secret, expiresIn } = jwtConfigAuth

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })
    return res.status(200).cookie('toke', token).json({ token })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

const updateUser = async (req: Request, res: Response) => {
  if (!req.user?.sub) {
    return res.status(401).json({ message: 'JWT invalid' })
  }

  const bodySchema = z.object({
    name: z.string(),
    threads_url: z.string().optional(),
    twitter_url: z.string().optional(),
    tiktok_url: z.string().optional(),
    instagram_url: z.string().optional(),
  })

  const { name, instagram_url, threads_url, tiktok_url, twitter_url } =
    bodySchema.parse(req.body)
  const image = req.file

  let dataToUpdate
  if (image) {
    dataToUpdate = {
      name,
      instagram_url,
      threads_url,
      tiktok_url,
      twitter_url,
      image: image.filename,
    }
  } else {
    dataToUpdate = {
      name,
      instagram_url,
      threads_url,
      tiktok_url,
      twitter_url,
    }
  }
  try {
    const { user } = await userService.updateUser(req.user.sub, dataToUpdate)
    return res.status(200).json(user)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

export {
  createUser,
  selectUser,
  authenticateUser,
  selectUserByEmail,
  updateUser,
}
