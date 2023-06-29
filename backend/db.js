const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("the Database is connected successfully");
  })
  .catch((e) => {
    console.log("The Database connection is failed" + e);
  });
