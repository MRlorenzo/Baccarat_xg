import DataManager from './DataManager';

export const com = new DataManager('/com.db');

export const angle = new DataManager('/angle.db');

export const setting = new DataManager('/setting.db');

export const limit = new DataManager('/limit.db' , false);

export const auth = new DataManager('auth');

const storage = window.localStorage;
export function localSet( key , value) {
    storage.setItem(key , value);
}

export function localGet( key ) {
    return storage.getItem(key);
}