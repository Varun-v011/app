// electron.js (Main Process) using ES Modules syntax

import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { promises as fs } from 'fs';





// Define a path to save your JSON data, e.g. inside user's app data directory
const dataFilePath = path.join(app.getPath('userData'), 'jobs-data.json');

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 400,
    minHeight: 500,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
        "default-src 'self'; connect-src 'self' https://zenquotes.io https://leetcode-stats.tashif.codes; img-src 'self' https://leetcode-stats.vercel.app https://img.logo.dev https://leetcard.jacoblin.cool/varun_v11?ext=activity  data: blob:;"

        ]
      }
    });
  });
  
  mainWindow.webContents.session.clearCache().then(() => {
    console.log('Cache cleared');
    if (process.env.NODE_ENV === 'development') {
      mainWindow.loadURL('http://localhost:5173');
    } else {
      mainWindow.loadFile(path.join(app.getAppPath(), 'dist', 'index.html'));
    }
  })
  .catch((err) => {
    console.error('Error clearing cache:', err);
    // Still load the app in case clearing cache failed
    if (process.env.NODE_ENV === 'development') {
      mainWindow.loadURL('http://localhost:5173');
    } else {
      mainWindow.loadFile(path.join(app.getAppPath(), 'dist', 'index.html'));
    }
  });
  

  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    await mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    await mainWindow.loadFile(path.join(app.getAppPath(), 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => {
    // Dereference the window object here if stored globally
  });
}

// Safe loading handler
ipcMain.handle('load-data', async () => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    if (!data.trim()) {
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist yet — return empty list
      return [];
    }
    console.error('Failed to load data:', error);
    throw error;
  }
});

// Save handler
ipcMain.handle('save-data', async (event, jobs) => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2), 'utf-8');
    console.log('Data saved:', jobs);
    return true;
  } catch (error) {
    console.error('Failed to save data:', error);
    throw error;
  }
});

// Load electron-reload dynamically for ES modules
(async () => {
  try {
    const electronReload = (await import('electron-reload')).default;
    // Add optional config if needed, e.g. electron executable path:
    electronReload(__dirname, { electron: path.join(__dirname, 'node_modules', '.bin', 'electron') });
  } catch (error) {
    console.warn('electron-reload not enabled or failed to load:', error);
  }
})();

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
