import { use, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Page } from '@/components/core/Page'
import { useObjectInput, useQuery, useQueryPage } from '@/utils'
import { Org, OrgUserGroup, OrgUserInOrgUserGroup } from '@/models/org'
import { ArrayStringInput, ASC, autoResetId, EQ, ObjectInput, OrderByInput, QueryPage } from 'mobx-orm'
import OrgList from '@/components/org/org/OrgList'
import OrgCreate from '@/components/org/org/OrgCreate'
import OrgUserGroupTree from '@/components/org/org-user-group/OrgUserGroupTree'
import OrgUserInOrgUserGroupList from '@/components/org/org-user-in-org-user-group/OrgUserInOrgUserGroupList'
import OrgUserInOrgUserGroupCreate from '@/components/org/org-user-in-org-user-group/OrgUserInOrgUserGroupCreate'


const OrgsPage = observer(() => {

    const [orgs, ready] = useQuery(Org, { autoupdate: true, }) as [QueryPage<Org>, Promise<void>]
    const orgInput = useObjectInput(ObjectInput, {
        syncURL: 'org',
        required: true,
        options: orgs,
        autoReset: autoResetId
    }, true)
    use(ready)  // page is ready if orgs are loaded

    const [groups, ] = useQuery(OrgUserGroup, {
        filter: EQ('org_id', orgInput),
        orderBy: OrderByInput({value: new Map([['level', ASC]])}),
        autoupdate: true,
    }) as [QueryPage<OrgUserGroup>, Promise<void>]
    const groupInput = useObjectInput(ObjectInput, {
        syncURL: 'group',
        required: true,
        options: groups,
        autoReset: autoResetId
    }, true)

    const [groupUsers, ] = useQuery(OrgUserInOrgUserGroup, {
        filter: EQ('org_user_group_id', groupInput),
        relations: ArrayStringInput({value: ['org_user.user', ]}),
        autoupdate: true,
    }) as [QueryPage<OrgUserGroup>, Promise<void>]
    const userInput = useObjectInput(ObjectInput, {
        syncURL: 'user',
        required: true,
        options: groupUsers,
        autoReset: autoResetId
    }, true)
    
    return (
        <Page>
            <div className='m-4'>
                <OrgCreate onCreated={() => orgs.shadowLoad()}/>
            </div>
            <OrgList orgInput={orgInput}/>
            <OrgUserGroupTree groupInput={groupInput}/>
            <div className='m-4'>
                <OrgUserInOrgUserGroupCreate orgInput={orgInput} onCreated={() => groupUsers.shadowLoad()}/>
            </div>
            <OrgUserInOrgUserGroupList input={userInput}/>
        </Page>
    )
})

export default OrgsPage
