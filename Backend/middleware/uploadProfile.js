import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profileImages");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const uploadProfile = multer({
  storage,
  fileFilter
});

export default uploadProfile;

