const { app, BrowserWindow } = require("electron");
const path = require("path");
//const {} = require("auth.js");
const { ipcMain } = require("electron");

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
  // Aquí iría la lógica para validar el login.
  console.log("Login attempt:", email, password);
  return {
    success: true, // Simula un login exitoso
  };
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
