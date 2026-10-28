const Database = require("better-sqlite3");

const db = new Database("files.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT,
    upload_at TEXT,
    uploaded_by TEXT,
    path TEXT NOT NULL
  )
`);




module.exports = db;
