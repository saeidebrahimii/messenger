const { Router } = require("express");
const userController = require("../controllers/user");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirUploadPath = path.join(__dirname, "../../../uploads");
    if (!fs.existsSync(dirUploadPath)) {
      fs.mkdirSync(dirUploadPath);
    }
    cb(null, path.join(dirUploadPath));
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});
const upload = multer({ storage: storage });

const router = Router();
router.post("/", upload.single("avatar"), userController.create);

module.exports = { userRoutes: router };
