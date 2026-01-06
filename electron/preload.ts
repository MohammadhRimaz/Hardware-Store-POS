import { ipcRenderer, contextBridge } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("api", {
  // on(...args: Parameters<typeof ipcRenderer.on>) {
  //   const [channel, listener] = args
  //   return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  // },
  // off(...args: Parameters<typeof ipcRenderer.off>) {
  //   const [channel, ...omit] = args
  //   return ipcRenderer.off(channel, ...omit)
  // },
  // send(...args: Parameters<typeof ipcRenderer.send>) {
  //   const [channel, ...omit] = args
  //   return ipcRenderer.send(channel, ...omit)
  // },
  // invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
  //   const [channel, ...omit] = args
  //   return ipcRenderer.invoke(channel, ...omit)
  // },

  // You can expose other APTs you need here.
  // ...

  // Categories
  createCategory: (name: string) => ipcRenderer.invoke("category:create", name),

  getCategories: () => ipcRenderer.invoke("category:getAll"),

  // Products
  getProducts: () => ipcRenderer.invoke("product:getAll"),

  // Customers
  getCustomers: () => ipcRenderer.invoke("customer:getAll"),
});
