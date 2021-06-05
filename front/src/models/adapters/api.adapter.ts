import axios from 'axios'
import { Model, Adapter }   from 'mobx-orm'


export class ApiAdapter<M extends Model> implements Adapter<M> {

    // private readonly myInit = { 
    //     headers: {}, 
    //     response: true, // return the entire Axios response object instead of only response.data)
    //     queryStringParameters: { 
    //         env: 'dev',
    //     },
    // };

    constructor(
        private cls,
        private endpoint: string) {
    }

    async save(obj: M) : Promise<M> {
        // // gather data from obj
        // let data = {}
        // for(let field_name in obj.model.fields) {
        //     if (obj[field_name] !== null) {
        //         data[field_name] = obj[field_name]
        //     }
        // }

        // if (obj.__id === null) {
        //     // create 
        //     data = await this.http.post(`${this.api}/`, data)
        //     // update values
        //     for(let field_name in obj.model.fields) {
        //         obj[field_name] = data[field_name]
        //     }
        // }
        // else {
        //     // edit
        //     data = await this.http.put(`${this.api}/${obj.__id}/`, data)
        //     // update values
        //     for(let field_name in obj.model.fields) {
        //         // do not touch the ids
        //         if (!obj.model.ids.includes(field_name)) {
        //             obj[field_name] = data[field_name]
        //         }
        //     }
        // }
        // // push saved data to obj
        return obj
    }
    async delete(obj: M) : Promise<any> {
        // return this.http.delete(`${this.api}/${obj.__id}/`)
    }

    async load (where: any ={}, order_by=[], limit=50, offset = 0) : Promise<M[]> {
        let params
        for(let key in where) {
            params[key] = where[key]
        }

        let response = await axios.get(`/api/${this.endpoint}`, { params: params})

        // init objects from data 
        let data = response.data 
        let objs : M[] = []
        for (let obj of data) {
            objs.push(new this.cls(obj))
        }
        return objs
    }
}


// model decorator
export function api(endpoint: string) {
    return (cls) => {
        let adapter = new ApiAdapter(cls, endpoint)
        cls.__proto__.adapter = adapter 
    }
}
