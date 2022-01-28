const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

/**
 * this function filter images and videos based on the file type
 */
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    // to accept files pass true
    cb(null, true);
  } else {
    // to reject files pass false
    cb(null, false);

    // throw error
    cb(
      new Error("Only .png, .jpg, .jpeg, .pdf and .mp4 files are allowed!"),
      false
    );
  }
};

const upload = multer({ fileFilter: fileFilter, storage: storage });

// upload file middleware
const fileUpload = (req, res, next) => {
  upload.any()(req, res, (err) => {
    // send error if file type is incorrect
    if (err) {
      return res.status(400).json({
        success: false,
        message: "You can only upload .png, .jpg, .jpeg",
        data: {},
      });
    }

    next();
  });
};

module.exports = fileUpload;
