import { makeObservable, observable, runInAction } from 'mobx'
import { waitIsTrue } from 'mobx-orm'
import http from './http'


class Settings {
    // NOTE: there are no observable fields
    // because they initialized once and never changed except is_ready
    @observable is_ready    :boolean    = false 
                error       :string     = '' 

    // frontend settings
    // readonly DEBUG :boolean    = process.env.DEBUG === 'true' ? true : false
    readonly DEBUG :boolean = false 

    // backend settings
    API_DEBUG   :boolean = false
    API_VERSION :string  = '-' 

    constructor () {
        makeObservable(this)
        this.DEBUG = true 
        this.init()
    }

    private async init () {
        try {
            const response = await http.get('/settings/')
            this.API_DEBUG = response.data.DEBUG
            this.API_VERSION = response.data.RELEASE_VERSION
        }
        catch (e: any) {
            this.error = e.message
            console.error(e)
        }
        finally {
            runInAction(() => this.is_ready = true)
        }
    }

    ready = async () => waitIsTrue(this, 'is_ready')
}

const settings = new Settings()
export default settings
