
import { Model, model, field } from 'mobx-orm'
import { api } from '@/services/http-adapter'


@api('lesson')
@model
export class Lesson extends Model {
}
