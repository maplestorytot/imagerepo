import { imageHash } from "image-hash";
import util from 'util'
const imageHashing = util.promisify(imageHash)
export default hashImage
async function hashImage(imageInfo, buffer){
    if(buffer){
        return await imageHashing(buffer, 16, true)
    }
    return await imageHashing(imageInfo.source, 16, true)
}