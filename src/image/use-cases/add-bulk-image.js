import makeImage from '../image'

export default function makeBulkAddImage ( {imagesDb} ) {
    return async function addBulkImage (bulkImageInfo) {
      const images = []
      bulkImageInfo.forEach((imageInfo)=>{
        images.push(makeImage(imageInfo))
      })
  
  
      let promises = []
      images.forEach((image)=>{
        const exists = imagesDb.findByHash({ hash: image.getHash() })
        promises.push(exists)
  
      })
      let existsAndNulls = await Promise.all(promises)
  
  
      promises = []
      existsAndNulls.forEach((existsOrNull, index)=>{
        if (!existsOrNull) {
          promises.push(imagesDb.insert({
            userId: images[index].getUserId(),
            createdOn: images[index].getCreatedOn(),
            id: images[index].getId(),
            modifiedOn: images[index].getModifiedOn(),
            title: images[index].getTitle(),
            description: images[index].getDescription(),
            source:images[index].getSource(),
            privacy: images[index].getPrivacyPolicy(),
            hash:images[index].getHash()
          }))
        }else{
          // QUESTION: should I return the ones already existing as well?
          // promises.push(existsOrNull)
        }
      })
  
      return Promise.all(promises)
    }
  }