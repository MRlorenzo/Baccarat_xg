import DataManager from './DataManager';
import store from './datastore';
import { clone } from "../utils";
import moment from 'moment';

const _find = Symbol();
const db = {
    save( key , doc){
        const data = DataManager.box(key , doc);
        return new Promise((resolve, reject) => {
            store.insert( data , (err, doc)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(DataManager.unbox(doc));
                }
            })
        })
    },
    async find( key , params = {} ){
        const docs = await this[_find](key , params);
        return DataManager.unbox(docs);
    },
    update( key , update){
        const query = {key: key};
        return new Promise( (resolve, reject) => {
            store.update(query , update , {} , (err, numReplaced)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(numReplaced);
                }
            })
        })
    },
    [_find](key , params){
        const query = clone(params , { key: key});
        return new Promise( (resolve, reject) => {
            store.find( query , (err, docs) => {
                if(err){
                    reject(err);
                }else{
                    resolve(docs);
                }
            })
        })
    },
    async lastOne( key ){
        const docs = await this[_find](key);
        if (docs == null || docs.length === 0){
            return null;
        }
        return docs.sort(function (a, b) {
            return a.createTime - b.createTime;
        }).map(DataManager.unbox).pop();
    },
    async toDayLast( key ){
        const docs = await this[_find](key, {
            date: moment().format('YYYY/MM/DD')
        });
        if (docs == null || docs.length === 0){
            return null;
        }
        return docs.sort(function (a, b) {
            return a.createTime - b.createTime;
        }).map(DataManager.unbox).pop();
    }
}

export default db;