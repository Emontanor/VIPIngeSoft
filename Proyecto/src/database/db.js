const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "db.sqlite");
const db = new sqlite3.Database(dbPath);

module.exports = db;
