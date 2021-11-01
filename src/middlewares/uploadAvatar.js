const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./public/images/users");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      "user-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
    storage
})

module.exports = upload