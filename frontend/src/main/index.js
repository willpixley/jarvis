import { app, BrowserWindow } from 'electron'
import path from 'node:path'

import { registerRoute } from '../lib/electron-router-dom'

async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
    //fullscreen: true, // Ensures full screen
    //frame: false
  })

  registerRoute({
    id: 'main',
    browserWindow: mainWindow,
    htmlFile: path.join(__dirname, '../renderer/index.html')
  })

  mainWindow.on('ready-to-show', mainWindow.show)
  mainWindow.webContents.openDevTools()
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
