import { Model, model, field } from 'mobx-orm'
import { api } from '@/services/http-adapter'


@api('lesson-block')
@model
export class LessonBlock extends Model {
}
