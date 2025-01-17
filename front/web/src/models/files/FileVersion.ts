import { Model, model, field, foreign, many } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { File } from './File'


@api('file-version')
@model
export class FileVersion extends Model {
    @field original_id  ?: number
    @field slug         ?: string
    @field file         ?: string

    @foreign(File, 'original_id' ) readonly original: File
}
many(FileVersion, 'original_id')(File, 'versions')
