"use strict";

require("./helpers").globalHelper;

// require("./middlewares/errorHandler");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require("path");
const passport = require("passport");
// const { User } = require("./routes");

// require("./services/authServices").getJwks();

const app = express();

// Middleware
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//passport middleware
app.use(passport.initialize());

//passport config
// app.use(fileUpload());

//routes
require("./routes")(app);
require("./config/passport")(passport);
// app.use("/customer", customer);
// app.use("/store", store);
// app.use("/storeAdmin", storeAdmin);
// app.use("/category", category);
// app.use("/product-category", productCategory);
// app.use("/product", product);

//unknown route
// app.use((req, res, next) => {
//   const error = new ErrorHandler(404, "Api Not found");
//   next(error);
// });

//error handler
app.use((error, req, res, next) => {
  console.log("errorhandler", error.message);
  handleError(error, res);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Connected at port ${port}`);
});
