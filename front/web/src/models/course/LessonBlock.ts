import { Model, model, field, foreign, many } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { Lesson } from './Lesson'


export enum LessonBlockType {
    TEXT    = 1,
    IMAGE   = 2,
    AUDIO   = 3,
    VIDEO   = 4
}

@api('lesson-block')
@model
export class LessonBlock extends Model {
    @field lesson_id    ?: number
    @field index        ?: number
    @field type         ?: LessonBlockType
    @field title        ?: string
    @field text         ?: string
    @field file         ?: string

    @foreign(Lesson) readonly lesson: Lesson
}

many(LessonBlock, 'lesson_id')(Lesson, 'blocks')