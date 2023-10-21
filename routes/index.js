const express = require("express");
const router = express.Router();
const Controller = require("../controller/moviesController");


const multer = require("../middelware/multer");

// menampilkan selurh data
router.get("/", Controller.showAll);

// menampilkan form add
router.get("/add", Controller.showFormAdd);

// menyimpan movie 
router.post("/add", multer.single('photo') ,Controller.addMovie)

// menampilkan form edit
router.get("/edit/:id",Controller.showFormEdit);

// menyimpan form edit
router.post("/edit/:id", multer.single('photo'), Controller.editMovie);

// menghapus movie
router.get  ("/delete/:id", Controller.deleteMovie);


module.exports = router;