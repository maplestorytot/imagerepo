import makeDb from '../../../__test__/fixtures/db'
import makeImagesDb from './images-db'
import makeFakeImageInfo from '../../../__test__/fixtures/image'

describe('images db', () => {
  let imagesDb

  beforeEach(async () => {
    imagesDb = makeImagesDb({ makeDb })
  })

  it('inserts an image', async () => {
    const image = await makeFakeImageInfo()
    const result = await imagesDb.insert(image)
    return expect(result).toEqual(image)
  })
  it('finds a image by id', async () => {
    const image = await makeFakeImageInfo()
    await imagesDb.insert(image)
    const found = await imagesDb.findById(image)
    // QUESTION: Why does found also have imageHash? is it because its in memory?
    expect(found).toEqual(image)
  })
})
