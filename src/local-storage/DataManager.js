import Datastore from 'nedb'
import path from 'path'
import {app, remote} from 'electron'

const dataPath = app != null ?
    app.getPath('userData') :
    remote.app.getPath('userData');

function createCollection(filePath) {
    return new Datastore({
        autoload: true,
        filename: path.join(dataPath, filePath),
        timestampData: true, // createdAt，updateAt
    })
}

export default class DataManager {
    constructor(filePath) {
        this.db = createCollection(filePath);
    }

    save(doc) {
        return new Promise((resolve, reject) => {
            this.db.insert(doc, (err, newDoc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(newDoc)
                }
            })
        })
    }

    update(doc, updateSetting) {
        return new Promise((resolve, reject) => {
            this.db.update(doc, updateSetting, (err, rows, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    find(query = {}) {
        return new Promise(((resolve, reject) => {
            this.db.find(query).exec((err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        }))
    }

    findOne(query = {}) {
        return new Promise(((resolve, reject) => {
            this.db.findOne(query).exec((err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        }))
    }

    findAndSort(query = {}, sortParams = {}) {
        return new Promise(((resolve, reject) => {
            this.db.find(query).sort(sortParams).exec((err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        }))
    }
}