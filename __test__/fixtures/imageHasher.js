import crypto from 'crypto'

export default async function hashImage(imageInfo) {
    return md5(imageInfo.source)
}

function md5 (text) {
    return crypto
      .createHash('md5')
      .update(text, 'utf-8')
      .digest('hex')
  }