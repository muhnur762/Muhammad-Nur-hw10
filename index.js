const express = require('express')
const app = express()
const port = 3000

const Controller = require("./controller/moviesController");
const route = require("./routes");

app.use(express.static('upload'));

app.set("view engine", "ejs");
app.use(express.urlencoded( { extended: false }));

app.use("/movies", route);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})