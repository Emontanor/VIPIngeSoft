const db = require("../database/db.js");
const { encriptarTexto } = require("./encrypt.js");

async function register(role, email, password, name) {
  try {
    const passwordHash = await encriptarTexto(password);
    const result = await putUsuario(role, email, name, passwordHash);
    console.log("Usuario registrado:", result.id);
    return { success: true };
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    return { success: false };
  }
}

function putUsuario(rol, correo, nombre, contraseña) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO usuarios (rol, correo, nombre, contraseña) VALUES (?, ?, ?, ?)",
      [rol, correo, nombre, contraseña],
      function (err) {
        if (err) return reject(err);
        return resolve({ success: true, id: this.lastID });
      }
    );
  });
}

async function report(email, age, date, type, description, lat, lng, zone) {
  try {
    console.log(
      "Datos del reporte:",
      email,
      age,
      date,
      type,
      description,
      lat,
      lng,
      zone
    );
    const id_usuario = await getIdUsarioByEmail(email);
    const id_tipo_incidente = await getIdTipoIncidenteByName(type);
    const id_area = zone;
    const result = await putIncidente(
      id_usuario,
      age,
      date,
      id_tipo_incidente,
      description,
      lat,
      lng,
      id_area
    );
    console.log("Reporte enviado:", result.id);
    return { success: true };
  } catch (error) {
    console.error("Error al enviar reporte:", error.message);
    return { success: false, message: "Error al enviar reporte" };
  }
}

function putIncidente(
  id_usuario,
  edad,
  fecha,
  id_tipo_incidente,
  descripcion,
  latitud,
  longitud,
  id_area
) {
  console.log("Insertando incidente con área:", id_area);
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO incidentes (usuario_id, edad, fecha, tipo, descripcion, latitud, longitud, area) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id_usuario,
        edad,
        fecha,
        id_tipo_incidente,
        descripcion,
        latitud,
        longitud,
        id_area,
      ],
      function (err) {
        if (err) return reject(err);
        return resolve({ success: true, id: this.lastID });
      }
    );
  });
}

function getIdUsarioByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get("SELECT id FROM usuarios WHERE correo = ?", [email], (err, row) => {
      if (err) return reject(err);
      if (!row) return reject(new Error("Usuario no encontrado"));
      resolve(row.id);
    });
  });
}

function getIdTipoIncidenteByName(name) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id FROM tipos_incidentes WHERE nombre = ?",
      [name],
      (err, row) => {
        if (err) return reject(err);
        if (!row) return reject(new Error("Tipo de incidente no encontrado"));
        resolve(row.id);
      }
    );
  });
}

module.exports = { register, report };
