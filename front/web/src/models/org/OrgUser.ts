import { Model, model, field, foreign, many } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { User } from '../core'
import { Org } from './Org'


@api('org-user')
@model
export class OrgUser extends Model {
    @field user_id  ?: number 
    @field org_id   ?: number 

    @foreign(Org , 'org_id' ) readonly org  : Org
    @foreign(User, 'user_id') readonly user : User
}
many(OrgUser, 'org_id')(Org, 'org_users')
