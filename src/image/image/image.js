import imagePrivacyPermission from "./image-privacy-permission"
export default function buildMakeImage({ Id, Path, md5 }) {
    return function makeImage({
        id = Id.makeId(),
        userId,
        source,
        createdOn = Date.now(),
        modifiedOn = Date.now(),
        title,
        description,
        privacy,
        imageHash
    } = {}) {
        if (!Id.isValidId(id)) {
            throw new Error('Image must have a valid id.')
        }
        if (!Id.isValidId(userId)) { // assumes that this is a valid userId that exists.
            throw new Error('Image must have an user id.')
        }
        if (!source || !Path.isValidPath(source)) {
            throw new Error('Image must have a source.')
        }
        if (!title || title.length < 1) {
            throw new Error('Image must include at least one character of title.')
        }
        if (!description || description.length < 1) {
            throw new Error('Image must include at least one character of description.')
        }
        if (!privacy || !imagePrivacyPermission.includes(privacy.toUpperCase())) {
            throw new Error('Image must have privacy policy')
        }
        // let relativeSource = path.relative(source)
        let hash
        return Object.freeze({
            getId: () => id,
            getUserId: () => userId,
            getCreatedOn: () => createdOn,
            getModifiedOn: () => modifiedOn,
            getSource: () => source,
            getTitle: () => title,
            getDescription: () => description,
            getPrivacyPolicy: () => privacy,
            getHash: () => hash || (hash = makeHash()),
        })

        function makeHash() {
            return md5(
                imageHash +
                userId +
                title +
                description
            )
        }
    }
}
