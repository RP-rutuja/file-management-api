const db = require("../config/db");

exports.create = (file) => {
  return db.prepare(`
    INSERT INTO files (name, type, upload_at, uploaded_by, path)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    file.name,
    file.type,
    file.upload_at,
    file.uploaded_by,
    file.path
  );
};

exports.getAll = () => {
  return db.prepare(`
    SELECT id, name, type, upload_at, uploaded_by
    FROM files
  `).all();
};

exports.getById = (id) => {
  return db.prepare(
    "SELECT * FROM files WHERE id = ?"
  ).get(id);
};

exports.update = (id, name, uploadedBy) => {
  return db.prepare(`
    UPDATE files
    SET name = ?, uploaded_by = ?
    WHERE id = ?
  `).run(name, uploadedBy, id);
};

exports.delete = (id) => {
  return db.prepare(
    "DELETE FROM files WHERE id = ?"
  ).run(id);
};
