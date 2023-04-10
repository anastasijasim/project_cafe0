import {PostController, UserController} from "./controllers/index.js"
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { loginValidation, registerValidation } from "./validations.js";

import cors from "cors"
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { postCreateValidation } from "./validations.js";

const app = express();
const port = 8080;
mongoose.connect(
    "mongodb+srv://anastasija:12345@cluster0.zl7jihh.mongodb.net/project_cafe3")
    .then(()=> console.log("DB ok"))
    .catch((err)=> console.log("DB error", err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static("uploads"));

app.post('/upload', upload.single('image'), function (req, res) {
  console.log(req.file); 
  res.send('File uploaded successfully!');
});

app.post ("/auth/login", loginValidation, handleValidationErrors, UserController.login)
app.get("/auth/me", checkAuth, UserController.getMe);
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);
  
app.get ("/posts", PostController.getAll );
app.get ("/posts/:id", PostController.getOne);
app.post ("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch ("/posts/:id", checkAuth , postCreateValidation ,handleValidationErrors, PostController.update);



app.listen(port, () => {
    console.log(`It works on ${port} port`);
});



