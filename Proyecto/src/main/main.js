const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const { login, statistics, map } = require("../backend/selects.js");
const { register, report } = require("../backend/inserts.js");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:5173");
}

ipcMain.handle("login", async (event, { email, password }) => {
  return await login(email, password);
});

ipcMain.handle("register", async (event, { role, email, password, name }) => {
  console.log("Register attempt:", role, email, password, name);
  return await register(role, email, password, name);
});

ipcMain.handle(
  "report",
  async (
    event,
    { name, email, age, date, type, description, lat, lng, zone }
  ) => {
    console.log(
      "Report attempt:",
      name,
      email,
      age,
      date,
      type,
      description,
      lat,
      lng,
      zone
    );
    return await report(email, age, date, type, description, lat, lng, zone);
  }
);

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
