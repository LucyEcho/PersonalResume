const DB_NAME = "FileHandleDB";
const HANDLE_STORE = "handles";
const CONFIG_STORE = "config";
const DB_VERSION = 2;
let db = null;
const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve();
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve();
    };
    request.onupgradeneeded = (event) => {
      const db2 = event.target.result;
      if (!db2.objectStoreNames.contains(HANDLE_STORE)) {
        db2.createObjectStore(HANDLE_STORE);
      }
      if (!db2.objectStoreNames.contains(CONFIG_STORE)) {
        db2.createObjectStore(CONFIG_STORE);
      }
    };
  });
};
const storeFileHandle = async (key, handle) => {
  await initDB();
  if (!db) throw new Error("Database not initialized");
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HANDLE_STORE, "readwrite");
    const store = transaction.objectStore(HANDLE_STORE);
    const request = store.put(handle, key);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};
const getFileHandle = async (key) => {
  await initDB();
  if (!db) throw new Error("Database not initialized");
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HANDLE_STORE, "readonly");
    const store = transaction.objectStore(HANDLE_STORE);
    const request = store.get(key);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};
const storeConfig = async (key, value) => {
  await initDB();
  if (!db) throw new Error("Database not initialized");
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CONFIG_STORE, "readwrite");
    const store = transaction.objectStore(CONFIG_STORE);
    const request = store.put(value, key);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};
const getConfig = async (key) => {
  await initDB();
  if (!db) throw new Error("Database not initialized");
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CONFIG_STORE, "readonly");
    const store = transaction.objectStore(CONFIG_STORE);
    const request = store.get(key);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};
const verifyPermission = async (handle, mode = "readwrite") => {
  if (!handle) {
    return false;
  }
  const options = { mode };
  if (await handle.queryPermission(options) === "granted") {
    return true;
  }
  if (await handle.requestPermission(options) === "granted") {
    return true;
  }
  return false;
};
export {
  getConfig as a,
  storeConfig as b,
  getFileHandle as g,
  storeFileHandle as s,
  verifyPermission as v
};
