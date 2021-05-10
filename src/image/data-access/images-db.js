import Id from '../Id'

export default function makeCommentsDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findById,
    findByHash,
  })
  async function insert ({ id: _id = Id.makeId(), ...commentInfo }) {
    const db = await makeDb()
    const result = await db
      .collection('images')
      .insertOne({ _id, ...commentInfo })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('images').find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  async function findByHash (image) {
    const db = await makeDb()
    const result = await db.collection('images').find({ hash: image.hash })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...insertedInfo } = found[0]
    return { id, ...insertedInfo }
  }
}
