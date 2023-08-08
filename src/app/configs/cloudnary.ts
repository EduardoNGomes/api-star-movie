import { env } from '@/env'

import { v2 as cloudinary } from 'cloudinary'

interface CloudinaryResponse {
  url: string
}

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.API_KEY,
  api_secret: env.API_SECRET,
})

export function createImageUrl(
  path: string,
): Promise<CloudinaryResponse> | null {
  const res: Promise<CloudinaryResponse> | null = cloudinary.uploader
    .upload(path, {
      resource_type: 'image',
    })
    .then((result) => result)
    .catch((error) => error)

  return res
}
