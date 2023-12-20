const express = require("express");
const path = require("path");

const app = express();
const port = 5555;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "projects.html"));
});

app.get("/skills", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "skills.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
