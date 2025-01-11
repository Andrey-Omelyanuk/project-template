import { Model, model, field } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { FileVersion } from './FileVersion'


export enum FileType {
    UNKNOWN = 0,
    IMAGE   = 1,
    AUDIO   = 2,
    VIDEO   = 3 
}


@api('file')
@model
export class File extends Model {
    @field upload_by_id ?: number
    @field upload_at    ?: string
    @field type         ?: FileType
    @field file         ?: string

    readonly versions: FileVersion[]
}
