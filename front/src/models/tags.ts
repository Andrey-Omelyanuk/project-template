import { computed } from 'mobx'
import { Model, model, id, field, many } from 'mobx-orm'
import { api } from './adapters/api.adapter'
import { Article, Page } from './spiders'


@api('analyzer')
@model
export class Analyzer extends Model {
    @id      id: number 
    @field name: string
    @field desc: string
}

@api('analyzer-session')
@model
export class AnalyzerSession extends Model {
    @id             id : number 
    @field analyzer_id : string
    @field     started : Date
    @field    finished : Date

    @computed get status() {
        return this.finished ? 'Done': 'In progress'
    }
}


@api('tag')
@model
export class Tag extends Model {
    @id    id   : number 
    @field title: string 
    @field desc : string 

    histories: TagHistory[]

    @computed get total_count() {
        let total = 0
        for(let history of this.histories) {
            total = total + history.count
        }

        return total
    }
}

@api('tag-history')
@model
export class TagHistory extends Model {
    @id            id : number 
    @field article_id : number 
    @field     tag_id : number 
    @field      count : number
}
many(TagHistory, 'tag_id')(Tag, 'histories') 
