import fs from 'fs'
import path from 'path'
import { TMP_FOLDER } from '../configs/multer'

export class DiskStorage {
  async deleteFile(file: any) {
    const filePath = path.resolve(TMP_FOLDER, file)
    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }
    await fs.promises.unlink(filePath)
  }
}
