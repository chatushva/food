import express from "express";
import { addFood ,listFood, removeFood} from "../controller/foodController.js";
import multer from "multer";

const routes = express.Router();

// image storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route
routes.post("/add", upload.single("image"), addFood);
routes.get("/list",listFood)
routes.post("/remove",removeFood)

export default routes;
