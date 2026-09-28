/**
 * IndexedDB storage for INTRAX event photos and videos
 * Allows high-capacity client-side persistence of uploaded media (HEIC, JPG, PNG, MP4, MOV)
 */

export interface StoredMediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  dataBlob?: Blob;
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

export async function saveMediaItemToDB(item: Omit<StoredMediaItem, 'url'> & { blob: Blob }): Promise<StoredMediaItem> {
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

    const putRequest = store.put(record);

    putRequest.onsuccess = () => {
      const url = URL.createObjectURL(item.blob);
      resolve({
        ...item,
        url,
        dataBlob: item.blob
      });
    };

    putRequest.onerror = () => {
      reject(putRequest.error);
    };
  });
}

export async function getAllMediaItemsFromDB(): Promise<StoredMediaItem[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const records = request.result || [];
        const items: StoredMediaItem[] = records.map((rec: any) => ({
          id: rec.id,
          name: rec.name,
          type: rec.type,
          url: rec.blob ? URL.createObjectURL(rec.blob) : '',
          dataBlob: rec.blob,
          caption: rec.caption || rec.name,
          category: rec.category || 'audience',
          categoryLabel: rec.categoryLabel || 'Highlights',
          timestamp: rec.timestamp || Date.now(),
          sizeFormatted: rec.sizeFormatted || 'Uploaded'
        }));
        resolve(items);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch {
    return [];
  }
}

export async function deleteMediaItemFromDB(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to delete media item:', err);
  }
}
