import { Model, model, field, foreign, many } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { Course } from './Course'
import { Lesson } from './Lesson'


@api('course-chapter')
@model
export class CourseChapter extends Model {
    @field course_id    : number
    @field index        : number
    @field title        : string
    @field desc         : string

    @foreign(Course) readonly course: Course

    readonly lessons: Lesson[]
}

many(CourseChapter, 'course_id')(Course, 'chapters')
