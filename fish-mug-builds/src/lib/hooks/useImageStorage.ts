'use client';

import type { GeneratedImage } from '@/lib/types';
import { useCallback, useEffect, useRef, useState } from 'react';

const DB_NAME = 'image-generator-db';
const DB_VERSION = 1;
const STORE_NAME = 'images';

interface StoredImage extends Omit<GeneratedImage, 'timestamp'> {
  timestamp: string; // ISO string for IndexedDB storage
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

function toStoredImage(image: GeneratedImage): StoredImage {
  return {
    ...image,
    timestamp: image.timestamp.toISOString(),
  };
}

function fromStoredImage(stored: StoredImage): GeneratedImage {
  return {
    ...stored,
    timestamp: new Date(stored.timestamp),
  };
}

export function useImageStorage() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dbRef = useRef<IDBDatabase | null>(null);

  // Initialize DB and load images
  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const db = await openDB();
        dbRef.current = db;

        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('timestamp');
        const request = index.openCursor(null, 'prev'); // Sort by timestamp descending

        const loaded: GeneratedImage[] = [];

        request.onsuccess = event => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
          if (cursor) {
            loaded.push(fromStoredImage(cursor.value));
            cursor.continue();
          } else {
            if (mounted) {
              setImages(loaded);
              setIsLoading(false);
            }
          }
        };

        request.onerror = () => {
          console.error('Failed to load images from IndexedDB');
          if (mounted) setIsLoading(false);
        };
      } catch (error) {
        console.error('Failed to open IndexedDB:', error);
        if (mounted) setIsLoading(false);
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const saveImage = useCallback(async (image: GeneratedImage): Promise<void> => {
    // Only save completed images (not loading or error states)
    if (image.isLoading || image.error || !image.imageUrl) return;

    const db = dbRef.current;
    if (!db) return;

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(toStoredImage(image));

      request.onsuccess = () => {
        setImages(prev => {
          const exists = prev.some(img => img.id === image.id);
          if (exists) {
            return prev.map(img => (img.id === image.id ? image : img));
          }
          return [image, ...prev];
        });
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }, []);

  const deleteImage = useCallback(async (id: string): Promise<void> => {
    const db = dbRef.current;
    if (!db) return;

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        setImages(prev => prev.filter(img => img.id !== id));
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }, []);

  const clearAllImages = useCallback(async (): Promise<void> => {
    const db = dbRef.current;
    if (!db) return;

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        setImages([]);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }, []);

  return {
    images,
    isLoading,
    saveImage,
    deleteImage,
    clearAllImages,
  };
}
