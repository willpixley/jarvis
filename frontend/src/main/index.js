import { app, BrowserWindow, ipcMain, shell } from 'electron'
import path from 'node:path'

import { registerRoute } from '../lib/electron-router-dom'

async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      sandbox: false,
      contextIsolation: true,

      preload: path.join(__dirname, '../preload/index.js')
    },
    fullscreen: true // Ensures full screen
    //frame: false
  })

  registerRoute({
    id: 'main',
    browserWindow: mainWindow,
    htmlFile: path.join(__dirname, '../renderer/index.html')
  })

  mainWindow.on('ready-to-show', mainWindow.show)
  mainWindow.webContents.openDevTools()
  //new
  ipcMain.handle('open-external', (event, url) => {
    shell.openExternal(url)
  })
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
