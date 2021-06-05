import { observable } from 'mobx';
import { Model, Adapter } from 'mobx-orm'

let store = observable({
    'core': {
        'app': {},
        'companies': {},
        'portfolio': {}
    },
    'mda': {
        'assessment': {},
        'assessment-detail': {}
    },
    'portal': {
        'buckets': {},
        'folders': {},
        'file': {}
    }
})

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class MockAdapter<M extends Model> implements Adapter<M> {

    private readonly myInit = { 
        headers: {}, 
        response: true, // return the entire Axios response object instead of only response.data)
        queryStringParameters: { 
            env: 'dev',
        },
    };

    constructor(
        private cls,
        private endpoint: string,
        private path    : string) {
    }

    async save(obj: M) : Promise<M> {
        // await timeout(500)
        // create 
        if (obj.__id === null) {
            // calculate and set new ID
            let ids = [0]
            for(let id of Object.keys(store[this.endpoint][this.path])) {
                ids.push(parseInt(id))
            }
            let max = Math.max.apply(null, ids)
            for(let name_id of obj.model.ids) {
                obj[name_id] = max + 1
            }
            store[this.endpoint][this.path][obj.__id] = obj

        }
        // edit
        else {
            store[this.endpoint][this.path][obj.__id] = obj
        }

        return obj
    }

    async delete(obj: M) : Promise<any> {
        await timeout(500)
        delete store[this.endpoint][this.path][obj.__id]
    }

    async load (where={}, order_by=[], limit=50, offset = 0) : Promise<M[]> {
        await timeout(500)
        let items = []
        if (Object.keys(where)) {
            for(let item of Object.values(store[this.endpoint][this.path])){
                let is_ok = true
                for(let key of Object.keys(where)) {
                    if (item[key] != where[key]) {
                        is_ok = false
                        break
                    }
                }
                if (is_ok) {
                    items.push(item)
                }
            }
        }
        else {
            items = Object.values(store[this.endpoint][this.path])
        }
        return items
    }
}

