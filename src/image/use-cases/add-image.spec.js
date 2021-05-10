import makeAddImage from './add-image'
import makeImagesDb from '../data-access/images-db'
import makeFakeImageInfo from '../../../__test__/fixtures/image'
import makeDb from '../../../__test__/fixtures/db'

describe('add image', () => {
  let imagesDb
  beforeAll(() => {
    imagesDb = makeImagesDb({ makeDb })
  })

  it('inserts images in the database', async () => {
    const newImage = await makeFakeImageInfo()
    const addImage = makeAddImage({imagesDb})
    const inserted = await addImage(newImage)
    delete newImage.imageHash
    expect(inserted).toMatchObject(newImage)
  })


  it('is idempotent', async () => {
    const addImage = makeAddImage({imagesDb})

    const newImage = await makeFakeImageInfo({ id: undefined })
    const insertOne = await addImage(newImage)
    const insertTwo = await addImage(newImage)
    expect(insertOne.id).toBeDefined()
    expect(insertOne.id).toBe(insertTwo.id)
  })
})
async function createManyFakeImages(number){
  let images = []
  for(let i = 0;i< number;i++){
    images.push(makeFakeImageInfo())
  }
  return Promise.all( images )
}