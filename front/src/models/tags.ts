import { computed, observable } from 'mobx'
import { Model, model, foreign, id, field, many } from 'mobx-orm'
import { api } from './adapters/api.adapter'
import { Article, Page } from './spiders'


@api('analyzer')
@model
export class Analyzer extends Model {
    @id      id: number 
    @field name: string
    @field desc: string

    sessions: AnalyzerSession[]
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
many(AnalyzerSession, 'analyzer_id')(Analyzer, 'sessions') 

@api('tag')
@model
export class Tag extends Model {
    @id    id   : number 
    @field title: string 
    @field desc : string 

    histories: TagHistory[]

    @observable is_active: boolean

    @computed get total_count() {
        let total = 0
        for(let history of this.histories) {
            total = total + history.count
        }

        return total
    }

    color
    constructor(...args) {
        super(args)
        this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    }
}

@api('tag-history')
@model
export class TagHistory extends Model {
    @id            id : number 
    @field article_id : number 
    @field     tag_id : number 
    @field      count : number

    @foreign(Tag, 'tag_id') tag: Tag 
    @foreign(Article, 'article_id') article: Article 
}
many(TagHistory, 'tag_id')(Tag, 'histories') 
many(TagHistory, 'article_id')(Article, 'tag_histories') 
