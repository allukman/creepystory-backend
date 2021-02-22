const multer = require('multer')

const {
  statusError
} = require('../helpers/status')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './uploads/')
  },
  filename: (_req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    const fileName = 'img_' + Date.now() + '.' + ext

    cb(null, fileName)
  }
})

const fileFilter = (_req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    return cb(new Error('Extension file must be JPG or PNG'), false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 1
}

const upload = multer({ storage, fileFilter, limits }).single('image')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      statusError(res, err)
    } else {
      console.log('Success upload image')
    }

    next()
  })
}

module.exports = uploadFilter
