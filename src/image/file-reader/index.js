import multer from 'multer'
import crypto from 'crypto'
import imageHash from '../image-hasher';
import path from 'path'
function md5 (text) {
    return crypto
      .createHash('md5')
      .update(text, 'utf-8')
      .digest('hex')
  }
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
};

const storageMulter = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mimetype");
        if (isValid) {
            error = null;
        }
        // TODO: fix pathing
        cb(error, path.join('../uploads'));
    },
    filename: (req, file, cb) => {
        let name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        name = name.split(".")[0]
        const ext = MIME_TYPE_MAP[file.mimetype];
        try{
            // const buffer = await readFile()
            // const final = md5(name + '_' + await imageHash({}, file.buffer)) + "." + ext
            const final = md5(name + '_' + Date.now()) + "." + ext
            cb(null, final); 
        }catch(error){
            console.log(error)
            cb(new Error("Could not save photo properly"), "FAIL"); 

        }

    }
});



let singleUpload = multer({ storage: storageMulter }).single('photo')
let multipleUpload = multer({ storage: storageMulter }).array('photos', process.env.MAX_BULK_ADD_PHOTO_COUNT)

export  {singleUpload, multipleUpload}
