import Dexie from 'dexie';

const db = new Dexie('PrositsOfflineDatabase');
db.version(1).stores({
    prositsOffline: '++id'
});

export default db;