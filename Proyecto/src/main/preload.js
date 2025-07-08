const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  login: (email, password) =>
    ipcRenderer.invoke("login", { email, password }),

  register: (role , email, password, name) =>
    ipcRenderer.invoke("register", {role, email, password, name }),
});
