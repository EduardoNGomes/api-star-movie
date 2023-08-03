import multer from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'

export const TMP_FOLDER = resolve(__dirname, '..', '..', '..', 'tmp')
export const UPLOADS_FOLDER = resolve(TMP_FOLDER, 'uploads')

export const MULTER = {
  storage: multer.diskStorage({
    destination: UPLOADS_FOLDER,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const filename = `${fileHash}-${file.originalname}`
      return cb(null, filename)
    },
  }),
}
