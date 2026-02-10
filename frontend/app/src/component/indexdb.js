// utils/db.js
import { openDB } from "idb";

export async function getDB() {
  return openDB("videos", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files");
      }
    },
  });
}
