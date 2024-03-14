const { app, BrowserWindow, ipcMain, nativeImage } = require('electron')
const fs = require('fs');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('src/index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('save-image', (event, dataUrl, filePath) => {
    const image = nativeImage.createFromDataURL(`data:image/png;base64,${dataUrl}`);
    const buffer = image.toPNG();

    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Failed to save the image', err);
            return;
        }
        console.log('The image has been saved!');
    });
});