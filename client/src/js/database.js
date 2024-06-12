import { openDB } from 'idb';

// Initialize the database
const initdb = async () => {
  await openDB('contactDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contacts')) {
        console.log('contacts store already exists');
        return;
      }
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
      console.log('contacts store created');
    },
  });
};

// Add data to the database
export const postDb = async (name, home, cell, email) => {
  const db = await openDB('contactDB', 1);
  const tx = db.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const result = await store.add({ name, home, cell, email });
  console.log('Data saved to the database', result);
};

// Get all data from the database
export const getDb = async () => {
  const db = await openDB('contactDB', 1);
  const tx = db.transaction('contacts', 'readonly');
  const store = tx.objectStore('contacts');
  const result = await store.getAll();
  console.log('Data retrieved from the database', result);
  return result;
};

// Delete data from the database
export const deleteDb = async (id) => {
  const db = await openDB('contactDB', 1);
  const tx = db.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const result = await store.delete(id);
  console.log('Data deleted from the database', result);
};

initdb();
