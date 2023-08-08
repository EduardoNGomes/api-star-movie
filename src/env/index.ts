import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test', override: true })
} else {
  config()
}

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string(),
  DATABASE_CLIENT: z.enum(['pg', 'sqlite']).default('pg'),
  SECRET_KEY: z.string(),
  API_SECRET: z.string(),
  API_KEY: z.string(),
  CLOUD_NAME: z.string(),
})

export const env = envSchema.parse(process.env)
