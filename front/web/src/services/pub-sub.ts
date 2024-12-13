import { Centrifuge, PublicationContext } from 'centrifuge'
import http from './http'
import { autorun } from 'mobx'
import settings from './settings'
import me from './me'


class PubSub {
    centrifuge          : Centrifuge = null
    admin_sub           : any
    user_sub            : any
    models              : any = {}

    private async connect() {
        if (this.centrifuge) {
            return
        }
        this.centrifuge = new Centrifuge('ws://pub-sub.localhost/connection/websocket', {
            debug: settings.DEBUG,
            getToken: async () => {
                const response = await http.get(`/connection-jwt/`, {})
                return response.data.token
            }
        })
        // this.centrifuge.on('state', (ctx) => console.log(ctx))
        this.centrifuge.on('error', (ctx) => console.error(ctx))
        this.centrifuge.connect()
    }

    register_model(model_name: string, model_class) {
        this.models[model_name] = model_class
    }

    async init() {
        if (this.centrifuge) 
            return
        await settings.ready()
        await me.ready()
        await this.connect()

        // disconnect on logout
        autorun(() => {
            if (me.user_id === null && this.centrifuge) {
                this.centrifuge.disconnect()
                this.centrifuge = null
            }
        })

        // connect to user channel
        autorun(() => {
            // user was logged out, unsubscribe from user channel
            if (me.user_id === null)  {
                if (this.user_sub) {
                    this.user_sub.unsubscribe()
                    this.user_sub = null
                }
                return 
            }
            if (this.user_sub) {
                return
            }
            // user was logged in, subscribe to user channel
            let user_channel = `user:${me.user_id}`
            this.user_sub = this.centrifuge.newSubscription(user_channel, {
                getToken: async () => {
                    const response = await http.get(`/subscription-jwt/`, {
                        params: { channel: user_channel}
                    })
                    return response.data.token
                }
            })
            // this.user_sub.on('publication', (ctx: PublicationContext) => console.log(ctx))
            // this.user_sub.on('state', (ctx: SubscriptionStateContext) => console.log(ctx))
            this.user_sub.on('error', (ctx) => console.log("subscription error", ctx))
            this.user_sub.subscribe()
        })
        // connect to admin channel
        autorun(() => {
            // user was logged out, unsubscribe from user channel
            if (!me.is_staff)  {
                if (this.admin_sub) {
                    this.admin_sub.unsubscribe()
                    this.admin_sub = null
                }
                return 
            }
            if (this.admin_sub) {
                return
            }
            // user was logged in, subscribe to user channel
            this.admin_sub = this.centrifuge.newSubscription('admin', {
                getToken: async () => {
                    const response = await http.get(`/subscription-jwt/`, {
                        params: { channel: 'admin'}
                    })
                    return response.data.token
                }
            })
            this.admin_sub.on('publication', (ctx: PublicationContext) => {
                // console.log(ctx)
                if (ctx.data.model in this.models) {
                    let obj = this.models[ctx.data.model].repository.cache.update(ctx.data.obj)
                    obj.refreshInitData()
                }
                else {
                    console.error(`unknown model ${ctx.data.model}`)
                }
            })
            // this.admin_sub.on('state', (ctx: SubscriptionStateContext) => console.log(ctx))
            this.admin_sub.on('error', (ctx) => console.log("subscription error", ctx))
            this.admin_sub.subscribe()
        })
    }
}

const pub_sub = new PubSub()
export default pub_sub
