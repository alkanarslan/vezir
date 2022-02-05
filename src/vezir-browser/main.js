// Electron
const { app } = require("electron");
const remoteMain = require("@electron/remote/main");
remoteMain.initialize();

app.allowRendererProcessReuse = true;
app.on("ready", () => {
  const window = require("./windows");
  mainWindow = window.createBrowserWindow(app);
  remoteMain.enable(mainWindow.webContents);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

app.on("window-all-closed", () => {
  app.quit();
});
