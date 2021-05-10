import faker from 'faker'
import cuid from 'cuid'
import path from 'path'
import crypto from 'crypto'
import imageHasher from './imageHasher'
// faker.directoryPath = function() {
//   return path.format({base: faker.fake("{{random.words}}").replace(/ /g, path.sep).toLowerCase()})
// }

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

export default async function makeFakeImageInfo (overrides) {
  let source = faker.random.image()
  const image = {
    userId: Id.makeId(),
    createdOn: Date.now(),
    id: Id.makeId(),
    modifiedOn: Date.now(),
    title: faker.lorem.paragraph(3),
    description: faker.lorem.paragraph(3),
    source: source,//path.join('./uploads/empty.png'), faker.directoryPath() + path.sep + faker.system.fileName(),
    privacy:"PRIVATE",
    imageHash:await imageHasher({source})//imageHash(faker.random.image(), 16, true)
  }
  return {
    ...image,
    ...overrides
  }
}
