const path = require("path");
const Database = require("better-sqlite3");

// Ruta del archivo .sqlite (se guardará en esta misma carpeta)
const dbPath = path.join(__dirname, "db.sqlite");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    correo TEXT UNIQUE,
    nombre TEXT,
    contraseña TEXT
  );
`);

console.log("✅ Base de datos inicializada correctamente.");