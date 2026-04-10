const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("punisherDesktop", {
  isDesktop: true,
  platform: process.platform,
  electronVersion: process.versions.electron,
});
