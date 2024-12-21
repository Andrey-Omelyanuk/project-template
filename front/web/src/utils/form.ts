import { ru } from 'date-fns/locale'
import { observable, action, runInAction} from 'mobx'
import { config, Input, Model } from 'mobx-orm'


export class ModelForm<T extends Model> {
    readonly    inputs      : { [key: string]: Input<any> } = {}
    private     obj         : T
    @observable isLoading   : boolean = false
    @observable errors      : string[] = []

    destroy() {
        for (const key in this.inputs) {
            this.inputs[key].destroy()
        }
    }

    setObj(obj: T) {
        this.obj = obj
        for (const key in this.inputs) {
            if (this.obj[key] !== undefined) {
                // set the input value from obj
                this.inputs[key].value = this.obj[key]
            }
            else {
                // clear the input
                this.inputs[key].setFromString('')
            }
        }
    }
    getObj() {
        return this.obj
    }

    get isReady(): boolean {
        return Object.values(this.inputs).every(input => input.isReady)
    }

    @action
    async submit() {
        if (!this.isReady) return   // just ignore

        runInAction(() => {
            this.isLoading = true
            this.errors = []
            // move values from inputs to obj
            for(const key in this.inputs) {
                this.obj[key] = this.inputs[key].value
            }
        })

        try {
            await this.obj.save() 
        }
        catch (err) {
            // handle errors
            for (const key in err.message) {
                if (key === config.NON_FIELD_ERRORS_KEY) {
                    this.errors = err.message[key]
                } else {
                    if (this.inputs[key])
                        this.inputs[key].errors = err.message[key]
                    else 
                        throw err
                }
            }
        }
        finally {
            runInAction(() => this.isLoading = false)
        }
    }
}


