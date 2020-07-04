import { ipcRenderer } from 'electron';
export async function setFullScreen() {
    return new Promise((resolve) => {
        ipcRenderer.send('fullScreen');
        ipcRenderer.once('fullScreened', event=> {
            resolve();
        })
    })
}