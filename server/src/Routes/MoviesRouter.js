import express from "express";
import * as moviesController from "../Controllers/MoviesController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/import", moviesController.importMovies);
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.get("/rated/top", moviesController.getTopRatedMovies);
router.get("/random/all", moviesController.getRandomMovies);

// Private routes
router.post("/:id/reviews", protect, moviesController.createMovieReview);

//Admin Routes
router.put("/:id", protect, admin, moviesController.updateMovie);
router.delete("/:id", protect, admin, moviesController.deleteMovie);
router.delete("/", protect, admin, moviesController.deleteAllMovies);
router.post("/", protect, admin, moviesController.createMovie);

export default router;
