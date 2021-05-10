import {makePostImage, makePostBulkImage} from './post-image'
import makeFakeImageInfo from '../../../__test__/fixtures/image'
import faker from 'faker'
import imageHasher from '../../../__test__/fixtures/imageHasher'
describe('post image controller', () => {
  it('successfully posts a image', async () => {
    // NOTE: unit testing, therefore we're mocking addImage as well to just return what was sent
    const postImage = makePostImage({ addImage: c => c, imageHasher }) 
    const image = await makeFakeImageInfo()
    const request = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: image,
      file: {
        // TODO: replace with multer mockup
        path: image.source
      },
      ip: faker.internet.ip
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(request.body.modifiedOn).toUTCString()
      },
      statusCode: 201,
      body: { posted: request.body }
    }
    const actual = await postImage(request)
    expect(actual).toEqual(expected)
  })
  it('reports user errors', async () => {
    const postImage = makePostImage({
      addImage: () => {
        throw Error('Pow!')
      },
      imageHasher
    })
    const fakeImage = await makeFakeImageInfo()
    const request = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      file: {
        // TODO: replace with multer mockup
        path: fakeImage.source
      },
      body: fakeImage
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Pow!' }
    }
    const actual = await postImage(request)
    expect(actual).toEqual(expected)
  })
  it('successfully bulk posts images', async () => {
    // NOTE: unit testing, therefore we're mocking addImage as well to just return what was sent
    const postBulkImage = makePostBulkImage({ bulkAddImage: c => c, imageHasher }) 
    const images = await createManyFakeImages(10)
    const files = []
    images.forEach((img)=>{
      files.push({path:img.source})
    })
    const request = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: {images},
      files: files,
      ip: faker.internet.ip
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(request.body.images[0].modifiedOn).toUTCString()
      },
      statusCode: 201,
      body: { postedImages: request.body.images }
    }
    const actual = await postBulkImage(request)
    expect(actual).toEqual(expected)
  })
})
async function createManyFakeImages(number){
  let images = []
  for(let i = 0;i< number;i++){
    images.push(makeFakeImageInfo())
  }
  return Promise.all( images )
}