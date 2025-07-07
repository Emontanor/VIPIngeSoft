const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
//const {} = require("auth.js");
const db = require("../database/db");


function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:5173"); // Puerto de desarrollo de Vite
}

ipcMain.handle("login", async (event, { email, password }) => {
  console.log("Login attempt:", email, password);

  const stmt = db.prepare("SELECT * FROM usuarios WHERE correo = ?");
  const usuario = stmt.get(email);
  if (usuario == null) {
    console.log("Usuario no encontrado");
  } else {
    console.log("Usuario encontrado:", usuario);
  }

  return {success: true,}; // Simula un login exitoso
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
