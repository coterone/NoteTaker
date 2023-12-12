const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require("./routes/routes.js"); // Import the routes

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));

// Use the routes from routes.js
app.use("/", routes);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
