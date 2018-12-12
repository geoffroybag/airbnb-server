const express = require("express");

const fileUploader = require("../config/file-uploader.js");

const router = express.Router();

router.post("/upload-image", 
  // in this route, expect to receive a single file (multer)
  fileUploader.single("fileSubmission"),
  (req, res, next) => {
    // multer puts all the information about the uploaded file in "req.file"
    console.log("New FILE UPLOAD", req.file);

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    const { originalName, secure_url, format, width, height } = req.file;

    res.json({
      fileName: originalName,
      fileUrl: secure_url,
      format,
      width,
      height
    })
});

module.exports = router;