const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { uploadResume } = require("../controllers/resumeController");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"));
    }
  },
});

router.post("/analyze-resume", upload.single("resume"), uploadResume);

module.exports = router;
