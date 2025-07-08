const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  login: (email, password) =>
    ipcRenderer.invoke("login", { email, password }),

  register: (email, password, name) =>
    ipcRenderer.invoke("register", { email, password, name }),
});
