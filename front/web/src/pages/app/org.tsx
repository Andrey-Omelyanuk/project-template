import { use } from 'react'
import { observer } from 'mobx-react-lite'
import { useQueryPage } from '@/utils'
import { Org } from '@/models/org'
import { QueryPage } from 'mobx-orm'
import OrgList from '@/components/org/org/OrgList'
import OrgCreate from '@/components/org/org/OrgCreate'


const OrgPage = observer(() => {

    const [orgs, ready] = useQueryPage(Org, {
        autoupdate: true
    }) as [QueryPage<Org>, Promise<void>]
    use(ready)
    
    return (
        <>
            <OrgList orgs={orgs}/>
            <div className='m-4'>
                <OrgCreate onCreated={() => orgs.load()}/>
            </div>
        </>
    )
})

export default OrgPage
