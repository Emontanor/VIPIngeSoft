const db = require("../database/db.js");
const { encriptarTexto } = require("./encrypt.js");

function putUsuario(role,correo,nombre,contraseña) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO usuarios (role, correo, nombre, contraseña) VALUES (?, ?, ?, ?)", [role, correo, nombre, contraseña], function(err) {
            if(err) return reject(err);
            return resolve({ success: true, id: this.lastID });
        });
    });
}

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

module.exports = {register} 