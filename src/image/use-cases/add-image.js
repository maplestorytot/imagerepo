import makeImage from '../image'
export default function makeAddImage ( {imagesDb} ) {
  return async function addImage (imageInfo) {
    const image = makeImage(imageInfo)
    const exists = await imagesDb.findByHash({ hash: image.getHash() })
    if (exists) {
      return exists
    }

    return imagesDb.insert({
      userId: image.getUserId(),
      createdOn: image.getCreatedOn(),
      id: image.getId(),
      modifiedOn: image.getModifiedOn(),
      title: image.getTitle(),
      description: image.getDescription(),
      source:image.getSource(),
      privacy: image.getPrivacyPolicy(),
      hash:image.getHash()
    })
  }
}
