const db = require("../database/db.js");
const { compararTexto } = require("./encrypt.js");

async function login(email, password) {
  try {
    const usuario = await getUsuarioPorCorreo(email);

    if (usuario == null) {
      console.log("Usuario no encontrado");
      return { success: false };
    } else {
      const isPasswordValid = await compararTexto(password, usuario.contraseña);
      if (!isPasswordValid) {
        console.log("Contraseña incorrecta");
        return { success: false };
      }
      console.log("Usuario encontrado:", usuario);
      console.log(usuario.rol, usuario.correo, usuario.nombre);
      return {
        success: true,
        rol: usuario.rol,
        correo: usuario.correo,
        nombre: usuario.nombre,
      };
    }
  } catch (error) {
    console.error("Error al realizar el login:", error);
    return { success: false };
  }
}

function getUsuarioPorCorreo(email) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM usuarios WHERE correo = ?", [email], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

async function statistics() {
  try {
    const incidentes = await getAllIncidentes();
    console.log("Incidentes obtenidos:", incidentes);
    return { success: true, data: incidentes };
  } catch (error) {
    console.log("Error al obtener estadísticas:", error);
    return { success: false, error: "Error al obtener estadísticas" };
  }
}

function getAllIncidentes() {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT usuarios.nombre as nombre,usuarios.correo as correo,incidentes.edad as edad,incidentes.fecha as fecha,tipos_incidentes.nombre as tipo_de_violencia,incidentes.descripcion as descripcion,areas.nombre as zona FROM incidentes JOIN usuarios ON incidentes.usuario_id = usuarios.id JOIN tipos_incidentes ON incidentes.tipo = tipos_incidentes.id JOIN areas ON incidentes.area = areas.id",
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

async function map() {
  try {
    const ubicaciones = await getAllCoordinates();
    console.log("Ubicaciones obtenidas", ubicaciones);
    return { success: true, data: ubicaciones };
  } catch (error) {
    console.error("Error fetching map data:", error);
    throw error;
  }
}

function getAllCoordinates() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT incidentes.latitud, incidentes.longitud, incidentes.fecha, tipos_incidentes.nombre AS tipo_de_violencia
       FROM incidentes
       JOIN tipos_incidentes ON incidentes.tipo = tipos_incidentes.id`,
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

module.exports = { login, statistics, map };
