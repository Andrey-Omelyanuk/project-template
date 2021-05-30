import { Model, model, id, field, foreign, many } from 'mobx-orm'
// import { api } from './api.adapter'


// @api('core', 'app')
@model
export class Spider extends Model {
    @id      id: number 
    @field name: string
    @field desc: string
}

// @api('core', 'app')
@model
export class Session extends Model {
    @id     id          : number 
    @field  spider_id   : number  
    @field  started     : Date
    @field  finished    : Date
}

// @api('core', 'app')
@model
export class Site extends Model {
    @id      id: number 
    @field  url: string
    @field desc: string
}

// @api('core', 'app')
@model
export class Page extends Model {
    @id     id      : number 
    @field  url     : string
    @field  site_id : number 
}

// @api('core', 'app')
@model
export class Article extends Model {
    @id     id          : number 
    @field  site_id     : number 
    @field  idx         : string
    @field  last_updated: Date 
    @field  title       : string 
    @field  body        : string 
    @field  publish_date: Date 
}

// @api('core', 'app')
@model
export class ArticleSnapshot extends Model {
    @id     id          : number 
    @field  session_id  : number
    @field  page_id     : number
    @field  article_id  : number
    @field  timestamp   : Date
    @field  title       : string 
    @field  body        : string 
    @field  publish_date: Date 
}
