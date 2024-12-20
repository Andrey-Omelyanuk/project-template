import { observable, action, runInAction} from 'mobx'
import { config, Input, Model } from 'mobx-orm'


export class ModelForm<T extends Model> {
    readonly    obj         : T
    readonly    inputs      : { [key: string]: Input<any> }
    @observable isLoading   : boolean = false
    @observable errors      : string[] = []

    constructor(obj: T) {
        this.obj = obj
        this.inputs = {}
    }

    destroy() {
        for (const key in this.inputs) {
            this.inputs[key].destroy()
        }
    }

    get isReady(): boolean {
        return Object.values(this.inputs).every(input => input.isReady)
    }

    get isError(): boolean {
        return this.errors.length > 0 || Object.values(this.inputs).some(input => input.errors.length > 0)
    }

    @action
    async submit() {
        if (!this.isReady) return   // just ignore
        this.isLoading = true
        this.errors = []

        // move values from inputs to obj
        for(const key in this.inputs) {
            this.obj[key] = this.inputs[key].value
        }

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


