/**
 * Local media storage for INTRAX event photos and videos.
 * Allows site administrators and organizers to load original high-res iPhone HEIC photos
 * and MP4/MOV videos with instant browser preview and IndexedDB persistence.
 */

export interface StoredMediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
  category: 'speakers' | 'audience' | 'felicitation' | 'videos';
  categoryLabel: string;
  timestamp: number;
  sizeFormatted: string;
}

const DB_NAME = 'ECell_RIET_Events';
const DB_VERSION = 1;
const STORE_NAME = 'intrax_media';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function saveMediaItemToDB(item: {
  id: string;
  name: string;
  type: 'image' | 'video';
  caption: string;
  category: 'speakers' | 'audience' | 'felicitation' | 'videos';
  categoryLabel: string;
  timestamp: number;
  sizeFormatted: string;
  blob: Blob;
}): Promise<StoredMediaItem> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record = {
      id: item.id,
      name: item.name,
      type: item.type,
      caption: item.caption,
      category: item.category,
      categoryLabel: item.categoryLabel,
      timestamp: item.timestamp,
      sizeFormatted: item.sizeFormatted,
      blob: item.blob
    };

    const req = store.put(record);
    req.onsuccess = () => {
      const objectUrl = URL.createObjectURL(item.blob);
      resolve({
        id: item.id,
        name: item.name,
        type: item.type,
        caption: item.caption,
        category: item.category,
        categoryLabel: item.categoryLabel,
        timestamp: item.timestamp,
        sizeFormatted: item.sizeFormatted,
        url: objectUrl
      });
    };
    req.onerror = () => reject(req.error);
  });
}

export async function getAllMediaItemsFromDB(): Promise<StoredMediaItem[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const records = req.result || [];
        const items: StoredMediaItem[] = records.map((rec: any) => ({
          id: rec.id,
          name: rec.name,
          type: rec.type,
          caption: rec.caption,
          category: rec.category,
          categoryLabel: rec.categoryLabel,
          timestamp: rec.timestamp,
          sizeFormatted: rec.sizeFormatted,
          url: URL.createObjectURL(rec.blob)
        }));
        resolve(items);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to load media from IndexedDB:', err);
    return [];
  }
}

export async function deleteMediaItemFromDB(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function clearAllMediaFromDB(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
