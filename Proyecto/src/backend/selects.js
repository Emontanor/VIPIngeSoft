const db = require("../database/db.js");
const { compararTexto } = require("./encrypt.js");

function getUsuarioPorCorreo(email){
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM usuarios WHERE correo = ?", [email], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

async function login(email, password){

  try{
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
        nombre: usuario.nombre
      }
    }
  }catch (error) {
    console.error("Error al realizar el login:", error);
    return { success: false };
  }
    
}

module.exports = { login };