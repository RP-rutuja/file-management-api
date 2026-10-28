require("dotenv").config();

const express = require("express");
const multer = require("multer");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

app.use(express.json());
app.use("/files", fileRoutes);

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

