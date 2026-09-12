import multer from "multer";
import path from 'path'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    cb(null, Date.now() + '-' + path.extname(file.originalname))
  }
})

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed.'), false)
  }
}

const upload = multer({ storage: storage, fileFilter: imageFileFilter })
const postUpload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
})

export default upload
export { postUpload }
