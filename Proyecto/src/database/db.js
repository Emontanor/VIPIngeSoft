const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "db.sqlite");

// Conexión a la base de datos
const db = new Database(dbPath, { verbose: console.log });

module.exports = db;