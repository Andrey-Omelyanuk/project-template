import { Suspense, use, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Page } from '@/components/core/Page'
import { useQuery, useQueryPage } from '@/utils'
import { Org } from '@/models/org'
import { QueryPage, timeout } from 'mobx-orm'
import OrgList from '@/components/org/org/OrgList'
import OrgCreate from '@/components/org/org/OrgCreate'
import { autorun } from 'mobx'


const OrgsPage = observer(() => {

    const [orgs, ready] = useQueryPage(Org, {
        autoupdate: true
    }) as [QueryPage<Org>, Promise<void>]
    use(ready)

    useEffect(() => {
        autorun(() => {
            console.log('Orgs:', orgs?.items)
        })
    }, [orgs])
    
    return (
        <Page>
            <div>
                <div>{orgs?.items.length}</div>
            </div>
            <OrgList orgs={orgs}/>
            <OrgCreate onCreated={() => orgs.load()}/>
        </Page>
    )
})

export default OrgsPage
