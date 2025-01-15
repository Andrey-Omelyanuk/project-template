import { Model, model, field } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { CourseUser } from './CourseUser'
import { CourseChapter } from './CourseChapter'


@api('course')
@model
export class Course extends Model {
    @field is_active    : Boolean
    @field title        : string
    @field desc         : string

    readonly users: CourseUser[]
    readonly chapters: CourseChapter[]
}
