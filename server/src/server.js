import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./Routes/UserRouter.js";
import moviesRouter from "./Routes/MoviesRouter.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import Uploadrouter from "./Controllers/UploadFile.js";
import categoriesRouter from "./Routes/CategoriesRouter.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

//Connection
connectDB();

//Main Routes
app.get("/", (req, res) => {
  res.send("API is running....");
});

//Other routes
app.use("/api/users", userRouter);
app.use("/api/upload", Uploadrouter);
app.use("/api/movies", moviesRouter);

app.use("/api/categories", categoriesRouter);

//error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost/${PORT}`);
});
