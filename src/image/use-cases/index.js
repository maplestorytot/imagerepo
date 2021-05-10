import makeAddImage from './add-image'
import makeBulkAddImage from './add-bulk-image'
// import makeListImages from './list-images'
import imagesDb from '../data-access'

const addImage = makeAddImage({ imagesDb })
const addBulkImage = makeBulkAddImage({ imagesDb })
// const editImage = makeEditImage({ imagesDb, handleModeration })
// const listImages = makeListImages({ imagesDb })
// const removeImage = makeRemoveImage({ imagesDb })

const imageService = Object.freeze({
  addImage,
  addBulkImage,
//   editImage,
//   handleModeration,
//   listImages,
//   removeImage
})

export default imageService
export { addImage, addBulkImage/*editImage, listImages, removeImage*/ }
