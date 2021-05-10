export {makePostImage, makePostBulkImage}

function makePostImage ({ addImage, imageHasher }) {
  return async function postImage (httpRequest) {
    try {
      const {... imageInfo } = httpRequest.body
      const source = httpRequest.file.path
      
      imageInfo.source = source
      const imageHash = await imageHasher(imageInfo)
      console.log({
        ...imageInfo,
        imageHash
      })
      const posted = await addImage({
        ...imageInfo,
        imageHash
      })
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(posted.modifiedOn).toUTCString()
        },
        statusCode: 201,
        body: { posted }
      }
    } catch (e) {
      // TODO: Error logging
      console.log(e)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
function makePostBulkImage ({ bulkAddImage, imageHasher }) {
  return async function postImage (httpRequest) {
    try {
      const [... imageInfos ] = httpRequest.body
      const imageHashPromises = []
      httpRequest.files.forEach((file, i)=>{
        imageHashPromises.push(imageHasher(imageInfos[i]))
      })
      const imageHashes = await Promise.all(imageHashPromises)
      const images = []
      imageHashes.forEach((hash, i)=>{
        let source = httpRequest.files[i].path
        let imageHash = imageHashes[i]
        images.push({
          ...imageInfos[i],
          source,
          imageHash
        })
      })
      const postedImages = await bulkAddImage(images)
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 201,
        body: { postedImages }
      }
    } catch (e) {
      // TODO: Error logging
      console.log(e)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}