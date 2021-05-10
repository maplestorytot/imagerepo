// import {
//   addImage,
// } from '../use-cases'
import {  addImage, addBulkImage} from '../use-cases'
import {makePostImage, makePostBulkImage}  from './post-image'
import notFound from './not-found'


import imageHasher from "../image-hasher"
console.log(addImage, addBulkImage)
const postImage = makePostImage({ addImage, imageHasher})
const postBulkImage = makePostBulkImage({ addBulkImage, imageHasher})

const imageController = Object.freeze({
  notFound,
  postImage,
  postBulkImage
})

export default imageController
export {notFound, postImage, postBulkImage }
