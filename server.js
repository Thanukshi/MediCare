var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
const routes = require("./routers");
const { json, urlencoded } = require("body-parser");

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*", // <-- allow all origins
    credentials: true,
  })
);

// Routes
app.use("/", routes);

//connect port and call server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listing to port ${port}`);
});
