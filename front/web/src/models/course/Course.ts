import { Model, model, field } from 'mobx-orm'
import { api } from '@/services/http-adapter'


@api('course')
@model
export class Course extends Model {
}
