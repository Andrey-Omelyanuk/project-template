import { Model, model, field, foreign, many } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { Org } from './Org'
import { OrgUserInOrgUserGroup } from './OrgUserInOrgUserGroup'


@api('org-user-group')
@model
export class OrgUserGroup extends Model {
    @field parent_id    ?: number
    @field org_id       ?: number
    @field name         ?: string

    @foreign(Org, 'org_id') readonly org: Org

    readonly parent     ?: OrgUserGroup
    readonly children    : OrgUserGroup[]
    readonly links       : OrgUserInOrgUserGroup[]
}
foreign(OrgUserGroup, 'parent_id')(OrgUserGroup.prototype, 'parent')
many(OrgUserGroup, 'parent_id')(OrgUserGroup, 'children')
many(OrgUserGroup, 'org_id')(Org, 'org_user_groups')
