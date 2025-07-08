const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const dbPath = path.join(__dirname, "db.sqlite");
const db = new sqlite3.Database(dbPath);

// Encapsular en serialize para ejecutar en orden
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY,
      nombre TEXT UNIQUE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role INTEGER,
      correo TEXT UNIQUE,
      nombre TEXT,
      contraseña TEXT,
      FOREIGN KEY (role) REFERENCES roles(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tipos_incidentes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS areas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE,
      delimitacion_inicial TEXT NOT NULL,
      delimitacion_final TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS incidentes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      tipo INTEGER NOT NULL,
      area INTEGER NOT NULL,
      coordenada TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      edad INTEGER NOT NULL,
      fecha TEXT NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
      FOREIGN KEY (tipo) REFERENCES tipos_incidentes(id),
      FOREIGN KEY (area) REFERENCES areas(id)
    )
  `);

  console.log("✅ Base de datos inicializada con sqlite3.");
});

// Cierra la conexión (opcional)
db.close();