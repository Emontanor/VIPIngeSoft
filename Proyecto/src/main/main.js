const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const { login } = require("../backend/selects.js");
const { register } = require("../backend/inserts.js");

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
  //console.log("Login attempt:", email, password);
  return await login(email, password);

});

ipcMain.handle("register", async (event, { role, email, password, name}) => {
  console.log("Register attempt:", role, email, password, name);
  return await register(role, email, password, name);
})

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
