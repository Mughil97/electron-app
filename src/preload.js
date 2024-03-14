const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveImage: (dataUrl, filePath) => ipcRenderer.send('save-image', dataUrl, filePath)
});
