const multer = require("multer");
const path=require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, path.resolve(`./public/images/`));
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage });
  const multipleUploads = upload.fields([{ name: 'userImage', maxCount: 3 }])

  module.exports={upload,multipleUploads};