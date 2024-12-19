import { Model, model, field, foreign, many } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { OrgUser } from './OrgUser'
import { OrgUserGroup } from './OrgUserGroup'
import { AccessLevel } from './AccessLevel'


@api('org-user-in-org-user-group')
@model
export class OrgUserInOrgUserGroup extends Model {
    @field org_user_group_id    ?: number
    @field org_user_id          ?: number
    @field level                 : AccessLevel

    // order is important
    @foreign(OrgUserGroup)  readonly org_user_group : OrgUserGroup
    @foreign(OrgUser)       readonly org_user       : OrgUser 

    get level_name (): string {
        return AccessLevel[this.level]
    }
}
many(OrgUserInOrgUserGroup, 'org_user_id')(OrgUser, 'links')
many(OrgUserInOrgUserGroup, 'org_user_group_id')(OrgUserGroup, 'links')
