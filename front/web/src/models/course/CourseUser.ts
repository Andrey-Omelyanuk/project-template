import { Model, model, field, foreign, many } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { Course } from './Course'
import { User } from '../core'


@api('course-user')
@model
export class CourseUser extends Model {
    @field course_id    : number
    @field user_id      : number
    @field is_student   : boolean
    @field is_teacher   : boolean
    @field is_admin     : boolean

    @foreign(Course) readonly course    : Course
    @foreign(User)   readonly user      : User 
}

many(CourseUser, 'course_id')(Course, 'users')
