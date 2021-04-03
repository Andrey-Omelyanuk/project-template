declare let process: any


class Settings {
    ready : Promise<any>

    private _SETTINGS   : string    = process.env.SETTINGS  ? process.env.SETTINGS  : '/settings.json'
    private _API        : string    = process.env.API_URI   ? process.env.API_URI   : '/api'
    private _DEBUG      : boolean   = process.env.DEBUG     ? process.env.DEBUG     : true 

    get API     () { return this._API       }
    get DEBUG   () { return this._DEBUG     }

    constructor() {
        this.ready = new Promise((resolve, reject) => {
            // get settings from backend
            let xhr = new XMLHttpRequest()
            xhr.open('GET', `${this._SETTINGS}`)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.onreadystatechange = () => {
                if (xhr.readyState !==   4) return
                if (xhr.status     !== 200) reject(xhr.status + ': ' + xhr.statusText)
                else {
                    let res = JSON.parse(xhr.responseText)
                    this._DEBUG = res.DEBUG ? res.DEBUG : false
                    resolve(this)
                }
            }
            xhr.send()
        })
    }
}

let settings = new Settings()
export default settings
