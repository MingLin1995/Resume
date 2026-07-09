const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5555;

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

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
  });
}

module.exports = app;
