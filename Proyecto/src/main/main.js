const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const { login , statistics , map } = require("../backend/selects.js");
const { register , report } = require("../backend/inserts.js");

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
});

ipcMain.handle("report", async (event, { name, email, age, date, type, description, lat, lng }) => {
  console.log("Report attempt:", name, email, age, date, type, description, lat, lng);
  return await report(email, age, date, type, description, lat, lng);
});

ipcMain.handle("statistics", async (event) => {
  try {
    return await statistics();
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
});

ipcMain.handle("map", async (event) => {
  try {
    return await map();
  } catch (error) {
    console.error("Error fetching map data:", error);
    throw error;
  }
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
