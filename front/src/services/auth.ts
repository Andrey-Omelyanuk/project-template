import { observable, computed, action } from 'mobx'
import settings from './settings'


class Auth {

    @computed get is_authenticated() : boolean { return false }
    @computed get user_id() : boolean { return false }

    @action
    login() {}

    @action
    logout() {}

    @action
    register() {}

    @action
    confirm() { 
    }

    @action
    refreshToken() {}

    // private 
}

const auth = new Auth()
export default auth 
