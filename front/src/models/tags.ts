import { Model, model, id, field } from 'mobx-orm'
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
}

@api('tag-history')
@model
export class TagHistory extends Model {
    @id            id : number 
    @field article_id : number 
    @field     tag_id : number 
    @field      count : number
}
