
import { Model, model, field, foreign, many } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { CourseChapter } from './CourseChapter'
import { LessonBlock } from './LessonBlock'


@api('lesson')
@model
export class Lesson extends Model {
    @field chapter_id   : number
    @field index        : number
    @field title        : string
    @field desc         : string

    @foreign(CourseChapter) readonly chapter: CourseChapter 

    readonly blocks: LessonBlock[]
}

many(Lesson, 'chapter_id')(CourseChapter, 'lessons')
