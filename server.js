const express = require("express");

const app = express();

app.use(express.static("build"));

const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
