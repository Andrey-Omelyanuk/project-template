import { Model, model, id, field } from 'mobx-orm'
import { api } from './adapters/api.adapter'
import { Page } from './spiders'


@api('tag')
@model
export class Tag extends Model {
    @id      id: number 
    @field title: string
    @field desc: string

    // this field exist only on frontend
    is_active: boolean
    total_count: number
}

@api('tag-history')
@model
export class TagHistory extends Model {
    @id    id       : number 
    @field timestamp: Date 
    @field page_id  : Page 
    @field tag_id   : Tag 
    @field count    : number
}
