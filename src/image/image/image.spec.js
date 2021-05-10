import makeFakeImageInfo from '../../../__test__/fixtures/image'
import makeImage from './'
describe('image', () => {
  it('must have an userId', async () => {
    const image = await makeFakeImageInfo({ userId: null })
    expect(() => makeImage(image)).toThrow('Image must have an user id.')
  })

  it('must have a valid source', async () => {
    const image = await makeFakeImageInfo({ source: null })
    expect(() => makeImage(image)).toThrow('Image must have a source.')
    
  })
  it('can have a source that is an absolute path', async () => {
    const image = await makeFakeImageInfo({source:"/images/afdaf/adf"})
    expect(() => makeImage(image)).not.toThrow()

  })
  it('can have a source that is an relative path', async () => {
    const image = await makeFakeImageInfo({source:"./images/afdaf/adf"})
    expect(() => makeImage(image)).not.toThrow()

  })
  it('can have a source that is a link', async () => {
    const image = await makeFakeImageInfo({source:"https://google.com/images/afdaf/adf"})
    expect(() => makeImage(image)).not.toThrow()
  })
  it('cant have a source that is an invalid link', async () => {
    const image = await makeFakeImageInfo({source:"https://google.com/images/afdaf/adff ad fadjsl fjsaldfj lasj las2u034u98y  [sa]f[d ]a[]"})
    expect(() => makeImage(image)).toThrow("Image must have a source.")
  })
  it('must have valid description', async () => {
    const image = await makeFakeImageInfo({ description: null })
    expect(() => makeImage(image)).toThrow(
      'Image must include at least one character of description.'
    )
  })
  it('must have valid title', async () => {
    const image = await makeFakeImageInfo({ title: null })
    expect(() => makeImage(image)).toThrow(
      'Image must include at least one character of title.'
    )
  })
  it('must have valid privacy policy', async () => {
    const image = await makeFakeImageInfo({ privacy: null })
    expect(() => makeImage(image)).toThrow(
      'Image must have privacy policy'
    )
  })
  it('can have private policy', async() => {
    const image = await makeFakeImageInfo({ privacy: "PRIVATE" })
    expect(() => makeImage(image)).not.toThrow()
  })
  it('can have public policy', async() => {
    const image = await makeFakeImageInfo({ privacy: "PUBLIC" })
    expect(() => makeImage(image)).not.toThrow()
  })
  it('can have an premade id', async() => {
    const image = await makeFakeImageInfo({ id: 'invalid' })
    expect(() => makeImage(image)).toThrow('Image must have a valid id.')
    const noId = await makeFakeImageInfo({ id: undefined })
    expect(() => makeImage(noId)).not.toThrow()
  })
  it('can create an new id', async() => {
    const noId = await makeFakeImageInfo({ id: undefined })
    const image = makeImage(noId)
    expect(image.getId()).toBeDefined()
  })
  it('is createdOn now in UTC', async() => {
    const noCreationDate = await makeFakeImageInfo({ createdOn: undefined })
    expect(noCreationDate.createdOn).not.toBeDefined()
    const d = makeImage(noCreationDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  it('is modifiedOn now in UTC', async() => {
    const noModifiedOnDate = await makeFakeImageInfo({ modifiedOn: undefined })
    expect(noModifiedOnDate.modifiedOn).not.toBeDefined()
    const d = makeImage(noModifiedOnDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })

})
