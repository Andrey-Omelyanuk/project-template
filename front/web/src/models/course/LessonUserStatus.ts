
import { Model, model, field, foreign, many } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { Lesson } from './Lesson'


@api('lesson-user-status')
@model
export class LessonUserStatus extends Model {
    @field lesson_id    : number
    @field user_id      : number
    @field finished_at  : string

    @foreign(Lesson) readonly lesson: Lesson
}

many(LessonUserStatus, 'lesson_id')(Lesson, 'user_statuses')
