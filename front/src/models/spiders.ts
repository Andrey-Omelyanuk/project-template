import { computed } from 'mobx'
import { many, Model, model, id, field, foreign } from 'mobx-orm'
import { api } from './adapters/api.adapter'
import { Tag, TagHistory } from './tags'


@api('spider')
@model
export class Spider extends Model {
    @id      id: number 
    @field name: string
    @field desc: string
    sessions: Session[]
}

@api('spider-session')
@model
export class Session extends Model {
    @id     id          : number 
    @field  spider_id   : number  
    @field  started     : Date
    @field  finished    : Date
    @field  load_started     : Date
    @field  load_finished    : Date

    @computed get status() {
        return this.finished ? 'Done': 'In progress'
    }
}
many(Session, 'spider_id')(Spider, 'sessions') 

@api('site')
@model
export class Site extends Model {
    @id      id: number 
    @field  url: string
    @field desc: string
    pages: Page[]
    articles: Article[]

    @computed get tag_counts() : [{tag: Tag, count: number}] {
        let tags = {} 
        for (let article of this.articles) {
            for (let tag_history of article.tag_histories) {
                if (!tags[tag_history.tag_id]) tags[tag_history.tag_id] = {tag: tag_history.tag, count: 0}
                tags[tag_history.tag_id].count = tags[tag_history.tag_id].count + tag_history.count
            }
        }
        return (<any>Object).values(tags)
    }
}

@api('page')
@model
export class Page extends Model {
    @id     id      : number 
    @field  url     : string
    @field  site_id : number 
    @field  last_visit: string // Date

    @foreign(Site, 'site_id') site: Site 

    @computed get full_url() {
        return `https://${this.site.url}${this.url}`
    }
}
many(Page, 'site_id')(Site, 'pages') 

@api('article')
@model
export class Article extends Model {
    @id     id          : number 
    @field  site_id     : number 
    @field  idx         : string
    @field  last_updated: Date 
    @field  title       : string 
    @field  body        : string 
    @field  publish_date: string //Date 

    tag_histories: TagHistory[]
}
many(Article, 'site_id')(Site, 'articles') 

@api('article-snapshot')
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
