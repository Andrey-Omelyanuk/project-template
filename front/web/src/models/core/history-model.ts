import { Model, field, foreign } from 'mobx-orm'
import { User } from './user'


export enum TypeOfChange {
    Created = <any>'+', // don't delete <any>!
    Updated = <any>'~',
    Deleted = <any>'-',
}

// TODO: I cannot declare it as abstract class, Vite will throw error 
export class HistoryModel extends Model {
    @field readonly history_date            : string
    @field readonly history_change_reason   : string | null
    @field readonly history_type            : TypeOfChange
    @field readonly history_user_id         : number

    @foreign(User) readonly history_user: User 

    get history_type_name (): string {
        switch (this.history_type) {
            case TypeOfChange.Created:
                return 'Created';
            case TypeOfChange.Updated:
                return 'Updated';
            case TypeOfChange.Deleted:
                return 'Deleted';
            default:
                return 'Unknown';
        }
    }

    getTimestamp() {
        return new Date(this.history_date)
    }
}
