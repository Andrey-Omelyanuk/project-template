import { Model, model, field } from 'mobx-orm'
import { api } from '@/services/http-adapter'


@api('course-chapter')
@model
export class CourseChapter extends Model {
}
