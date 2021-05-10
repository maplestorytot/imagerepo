import Id from '../Id'
import Path from '../path'
import buildMakeImage from './image'
import crypto from 'crypto'

const makeImage = buildMakeImage({ Id, Path, md5})

export default makeImage

function md5 (text) {
    return crypto
      .createHash('md5')
      .update(text, 'utf-8')
      .digest('hex')
  }