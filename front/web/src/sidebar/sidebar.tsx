import { action, observable, reaction } from 'mobx'
import { Input } from 'mobx-orm'

export const SIDEBAR = {
    OFF     : undefined,
    USER    : 'user',
    ORG     : 'org',
    SOURCE  : 'source',
    SESSION : 'session',
}

const sidebar_components = {
    [SIDEBAR.OFF    ]: null, 
    [SIDEBAR.USER   ]: <div> user sidebar </div>,
    [SIDEBAR.ORG    ]: <div> org sidebar </div>,
}
// I can't use observable into Sidebar class, because MobX has limitation 
// so I use observable.box
const component = observable.box(SIDEBAR.OFF)
const ANIMATION_SPEED = 500

class SideBar extends Input<string> {
    constructor (props: any) {
        super(props)
        this.updateComponent()
        this.__disposers.push(reaction(
            () => this.value,
            (value) => {
                // we need to wait for animation to finish
                if (value === SIDEBAR.OFF) {
                    setTimeout(this.updateComponent, ANIMATION_SPEED)
                }
                else {
                    this.updateComponent()
                }
            }
        ))
    }
   
    @action updateComponent () {
        component.set(sidebar_components[this.value])
    } 

    get component () {
        return component.get()
    }
}

export const sidebar = new SideBar({ syncURL: 'sidebar' })
