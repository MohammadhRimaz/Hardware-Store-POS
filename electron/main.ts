import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProduct } from "../src/services/product.service";
import { CreateProductInput } from "../src/types/product";

// ❌ REMOVE top-level DB/Service imports to prevent early loading
// import db from "../src/database/knex";
// import { createCategory... } ...

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_ROOT = path.resolve(__dirname, "..");
process.env.APP_ROOT = path.resolve(APP_ROOT);

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// =========================================================
// ✅ APP INITIALIZATION
// =========================================================
app.whenReady().then(async () => {
  try {
    // 1. Define DB Path FIRST
    const dbPath = path.join(app.getPath("userData"), "store.db");

    // 2. Set the ENV variable so Knex can see it
    process.env.DB_PATH = dbPath;
    console.log("Database Path set to:", dbPath);

    // 3. DYNAMICALLY Import DB and Services
    // This ensures they load AFTER process.env.DB_PATH is set
    // const { default: db } = await import("../src/database/knex");

    // Import services dynamically
    const { createCategory, getAllCategories } =
      await import("../src/services/category.service");
    const { getAllProducts } = await import("../src/services/product.service");
    const { getAllCustomers } =
      await import("../src/services/customer.service");

    // 4. Run Migrations Automatically
    // This creates the tables if they don't exist
    // try {
    //   console.log("Running Database Migrations...");
    //   await db.migrate.latest();
    //   console.log("Migrations Finished. Tables created.");

    // Optional: Run Seeds if needed
    // await db.seed.run();
    // } catch (err) {
    //   console.error("Migration Failed:", err);
    // }

    // 5. Setup IPC Handlers (Now that services are loaded)
    ipcMain.handle("category:create", async (_, name: string) => {
      try {
        await createCategory(name);
        return {
          success: true,
          data: null,
        };
      } catch (error) {
        console.error("[IPC] category:create failed:", error);
        return {
          success: false,
          error: "Failed to create category",
        };
      }
    });

    ipcMain.handle("category:getAll", async () => {
      try {
        const categories = await getAllCategories();

        return {
          success: true,
          data: categories,
        };
      } catch (error) {
        console.error("[IPC] category:getAll failed:", error);

        return {
          success: false,
          error: "Failed to fetch categories",
        };
      }
    });

    ipcMain.handle("product:create", async (_, payload: CreateProductInput) => {
      try {
        await createProduct(payload);
        return { success: true, data: null };
      } catch (error: any) {
        console.error("[IPC] product:create failed:", error);

        return {
          success: false,
          error: error.message || "Failed to create product",
        };
      }
    });

    ipcMain.handle("product:getAll", async () => {
      try {
        const products = await getAllProducts();

        return {
          success: true,
          data: products,
        };
      } catch (error) {
        console.error("[IPC] product:getAll failed:", error);

        return {
          success: false,
          error: "Failed to fetch products",
        };
      }
    });

    ipcMain.handle("customer:getAll", async () => {
      try {
        const customers = await getAllCustomers();

        return {
          success: true,
          data: customers,
        };
      } catch (error) {
        console.error("[IPC] customer:getAll failed:", error);

        return {
          success: false,
          error: "Failed to fetch customers",
        };
      }
    });

    // 6. Finally, Create Window
    createWindow();
  } catch (fatalError) {
    console.error("App failed to start:", fatalError);
    app.quit();
  }
});
