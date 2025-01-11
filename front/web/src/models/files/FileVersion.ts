import { Model, model, field, foreign, many } from 'mobx-orm'
import { File } from './File'


@model
export class FileVersion extends Model {
    @field original_id  ?: number
    @field slug         ?: string
    @field file         ?: string

    @foreign(File, 'original_id' ) readonly original: File
}
many(FileVersion, 'original_id')(File, 'versions')
