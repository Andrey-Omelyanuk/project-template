import { Model, model, field } from 'mobx-orm'
import { api } from '@/services/http-adapter'


@api('course-user')
@model
export class CourseUser extends Model {
}
