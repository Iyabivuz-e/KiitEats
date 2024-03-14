
const multer = require("multer");

//Handling the files using multer
const storage = multer.diskStorage({
  destination: "../uploads/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload