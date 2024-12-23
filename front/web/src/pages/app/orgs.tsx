import { use } from 'react'
import { observer } from 'mobx-react-lite'
import { Page } from '@/components/core/Page'
import { useQueryPage } from '@/utils'
import { Org } from '@/models/org'
import { ArrayStringInput, QueryPage } from 'mobx-orm'
import OrgList from '@/components/org/org/OrgList'
import OrgCreate from '@/components/org/org/OrgCreate'
import OrgUserGroupTree from '@/components/org/org/OrgUserGroupTree'


const OrgsPage = observer(() => {

    const [orgs, ready] = useQueryPage(Org, {
        autoupdate: true,
        relations   : ArrayStringInput({ value: ['org_users.user', 'org_user_groups']}), 
    }) as [QueryPage<Org>, Promise<void>]
    use(ready)
    
    return (
        <Page>
            <div className='m-4'>
                <OrgCreate onCreated={() => orgs.shadowLoad()}/>
            </div>
            <OrgList orgs={orgs}/>
            <OrgUserGroupTree orgs={orgs}/>
        </Page>
    )
})

export default OrgsPage
