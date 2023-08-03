import fs from 'fs'
import path from 'path'
import { UPLOADS_FOLDER } from '../configs/multer'

export class DiskStorage {
  async deleteFile(file: string) {
    const filePath = path.resolve(UPLOADS_FOLDER, file)
    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }
    await fs.promises.unlink(filePath)
  }
}
