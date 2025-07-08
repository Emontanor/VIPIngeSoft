const db = require("../database/db.js");
const { encriptarTexto } = require("./encrypt.js");

async function register(email, password, name) {

    try {
        const passwordHash = await encriptarTexto(password);
        const stmt = db.prepare(`INSERT INTO usuarios (correo, nombre, contraseña) VALUES (?, ?, ?)`);
        const result = stmt.run(email,name,passwordHash);
        if(result.changes > 0) {
            console.log("Usuario registrado exitosamente");
            return { success: true };
        }else {
            console.log("Error al registrar usuario");
            return { success: false };
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return { success: false };
    }
    
}

module.exports = {register} 