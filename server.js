const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(morgan("combined"));

mongoose
  .connect("mongodb://localhost:27017/dreams", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));

const dream = require("./routes/dream");
app.use("/api/v1/dream", dream);

app.listen(PORT, () => console.log(`Server listnening on port ${PORT}`));
