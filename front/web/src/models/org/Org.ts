import { computed } from 'mobx'
import { Model, model, field } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { OrgUser } from './OrgUser'
import { OrgUserGroup } from './OrgUserGroup'


@api('org')
@model
export class Org extends Model {
    @field name         ?: string
    @field is_active    ?: boolean

    readonly org_users:       OrgUser[]
    readonly org_user_groups: OrgUserGroup[]

    @computed({ keepAlive: true })
    get root_user_group (): OrgUserGroup | undefined {
        for (const group of this.org_user_groups) {
            if (group.parent === null || group.parent === undefined) {
                return group
            }
        }
        return undefined
    }
}
