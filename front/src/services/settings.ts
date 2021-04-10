import { makeObservable, observable } from 'mobx'
import http from './http'


class Settings {
    static readonly SETTINGS_URL = '/api/settings.json'
    
    @observable is_ready: boolean = false

    DEBUG   : boolean = true
    API     : string  = '/api'

    constructor() {
        makeObservable(this)
        this.loadSettings()
    }

    async loadSettings() {
        try {
           var settings = await http.get(Settings.SETTINGS_URL) 
           for(let name in settings) {
               this[name] = settings[name]
           }
        } 
        catch (e) {
            // ignore and use by default settings
        }
        this.is_ready = true
    }
}

let settings = new Settings()
export default settings
