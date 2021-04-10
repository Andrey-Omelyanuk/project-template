import { makeObservable, observable, computed, action } from 'mobx'
import settings from './settings'


class Auth {
    @observable is_ready: boolean = false
    @observable private token: string = ''

    @computed get user_id           (): number  { return 1 }
    @computed get is_authenticated  (): boolean { return !!this.token }
    @computed get access_token      (): string  { return this.token }
    @computed get access_token_exp  (): Date    { 
        // TODO: get exp date from token
        return new Date() 
    }
    constructor() {
        makeObservable(this)
        var access_token = localStorage.getItem('access_token')
        if (access_token === "null")
            access_token = ''
        this.setToken(access_token)
    }
    @action private setToken(token) {
        this.is_ready = true // first set token == auth is ready to use
        this.token = token
        localStorage.setItem('access_token', token)
    }

    async login() {
        this.setToken('test')
    }

    async logout() {
        this.setToken('')
    }

    async register() {}
    async confirm() {}
    async refreshToken() {}
}

const auth = new Auth()
export default auth 
