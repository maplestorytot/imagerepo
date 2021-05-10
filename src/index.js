import express from 'express'
import dotenv from 'dotenv'
import { notFound, postImage, postBulkImage} from './image/controllers'
import makeCallback from './express-callback'
import {singleUpload, multipleUpload} from './image/file-reader'

dotenv.config()

const apiRoot = process.env.DM_API_ROOT
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(`${process.env.LOCAL_IMAGE_UPLOAD_PATH}`, express.static(`${process.env.LOCAL_IMAGE_UPLOAD_PATH}`));

// TODO: figure out DNT compliance.
app.use((_, res, next) => {

  res.set({ Tk: '!' })
  next()
})
app.post(`${apiRoot}/images`, singleUpload, makeCallback(postImage))
app.post(`${apiRoot}/bulk-images`, multipleUpload, makeCallback(postBulkImage))
app.use(makeCallback(notFound))


// listen for requests
app.listen(3001, () => {
  console.log('Server is listening on port 3001')
})


export default app
