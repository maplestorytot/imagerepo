import  makeBulkAddImage from './add-bulk-image'
import makeImagesDb from '../data-access/images-db'
import makeFakeImageInfo from '../../../__test__/fixtures/image'
import makeDb from '../../../__test__/fixtures/db'

describe('add image', () => {
  let imagesDb
  beforeAll(() => {
    imagesDb = makeImagesDb({ makeDb })
  })

  
  it('inserts bulk images in the database', async () => {
    const images = await createManyFakeImages(10)
    const bulkAddImage = makeBulkAddImage({imagesDb})
    const newlyInserted = await bulkAddImage(images)
    expect(newlyInserted.length).toBe(images.length)
  })

  it('inserts bulk images in the database and if some already exist, it will not add them again', async () => {
    const bulkAddImage = makeBulkAddImage({imagesDb})
    const images = await createManyFakeImages(10)
    const existingImages = [images[0], images[5], images[8]]
    const existingInserted = await bulkAddImage(existingImages)
    expect(existingInserted.length).toBe(existingImages.length)
    const newlyInserted = await bulkAddImage(images)
    expect(newlyInserted.length).toBe(images.length - existingImages.length)
  })

  
})
async function createManyFakeImages(number){
  let images = []
  for(let i = 0;i< number;i++){
    images.push(makeFakeImageInfo())
  }
  return Promise.all( images )
}