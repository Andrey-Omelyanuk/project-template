
import { Model, model, field } from 'mobx-orm'
import { api } from '@/services/http-adapter'


@api('lesson-user-status')
@model
export class LessonUserStatus extends Model {
}
