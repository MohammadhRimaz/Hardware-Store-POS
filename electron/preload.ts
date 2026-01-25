import { ipcRenderer, contextBridge } from "electron";
import { CreateCustomerInput } from "../src/types/customer";
import { CreateProductInput } from "../src/types/product";

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
  createCategory: (name: string) =>
    ipcRenderer.invoke("categories:create", name),
  getCategories: () => ipcRenderer.invoke("categories:getAll"),

  // Products
  getProducts: () => ipcRenderer.invoke("products:getAll"),
  createProduct: (payload: CreateProductInput) =>
    ipcRenderer.invoke("products:create", payload),

  // Customers
  getCustomers: () => ipcRenderer.invoke("customers:getAll"),
  createCustomer: (payload: CreateCustomerInput) =>
    ipcRenderer.invoke("customers:create", payload),
});
