import { env } from '@/env'

export const jwtConfigAuth = {
  secret: env.SECRET_KEY || 'default',
  expiresIn: '1d',
}
