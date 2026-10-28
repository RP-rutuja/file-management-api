const File = require("../models/fileModel");
const fs = require("fs");

// Upload file
exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File is required" });
  }

  try {
    const result = File.create({
      name: req.file.originalname,
      type: req.file.mimetype,
      upload_at: new Date().toISOString(),
      uploaded_by: req.body.uploaded_by || "Unknown",
      path: req.file.path
    });

    res.status(201).json({
      message: "File uploaded successfully",
      id: result.lastInsertRowid
    });
  } catch (error) {
    fs.unlink(req.file.path, () => { });
    res.status(500).json({ message: "Upload failed" });
  }
};

// View all files
exports.getFiles = (req, res) => {
  res.json(File.getAll());
};

// View one file
exports.getFile = (req, res) => {
  const file = File.getById(req.params.id);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  delete file.path;
  res.json(file);
};

// Download file
exports.downloadFile = (req, res) => {
  const file = File.getById(req.params.id);

  if (!file || !fs.existsSync(file.path)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(file.path, file.name);
};

// Update metadata
exports.updateFile = (req, res) => {
  const file = File.getById(req.params.id);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  const name = req.body.name ?? file.name;
  const uploadedBy = req.body.uploaded_by ?? file.uploaded_by;

  File.update(req.params.id, name, uploadedBy);

  res.json({ message: "File updated successfully" });
};

// Delete file
exports.deleteFile = (req, res) => {
  const file = File.getById(req.params.id);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }

  File.delete(req.params.id);

  res.json({ message: "File deleted successfully" });
};
