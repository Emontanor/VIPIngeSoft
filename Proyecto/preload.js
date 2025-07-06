const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // funciones seguras aquí si necesitas comunicación con Node.js
});
