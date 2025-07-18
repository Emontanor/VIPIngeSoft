const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  login: (email, password) => ipcRenderer.invoke("login", { email, password }),

  register: (role, email, password, name) =>
    ipcRenderer.invoke("register", { role, email, password, name }),

  report: (name, email, age, date, type, description, lat, lng, zone) =>
    ipcRenderer.invoke("report", {
      name,
      email,
      age,
      date,
      type,
      description,
      lat,
      lng,
      zone,
    }),

  statistics: () => ipcRenderer.invoke("statistics"),

  map: () => ipcRenderer.invoke("map"),
});
