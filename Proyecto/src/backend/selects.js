const db = require("../database/db.js");
const { encriptarTexto , compararTexto } = require("./encrypt.js");

async function login(email, password){

  try{
    const passwordHash = await encriptarTexto(password);
    const stmt = db.prepare("SELECT * FROM usuarios WHERE correo = ?");
    const usuario = stmt.get(email);

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
      return { success: true };
    }
  }catch (error) {
    console.error("Error al realizar el login:", error);
    return { success: false };
  }
    
}

module.exports = { login };