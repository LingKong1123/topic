"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        invoke: (channel, ...args) => electron_1.ipcRenderer.invoke(channel, ...args),
        send: (channel, ...args) => electron_1.ipcRenderer.send(channel, ...args),
        on: (channel, func) => {
            electron_1.ipcRenderer.on(channel, (event, ...args) => func(...args));
        },
        once: (channel, func) => {
            electron_1.ipcRenderer.once(channel, (event, ...args) => func(...args));
        },
    },
});
