import { Card, CardList, Section, SectionCard } from '@blueprintjs/core'
import { QueryPage, NumberInput as NumberModelInput } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { Org } from '@/models/org'
import { useInput } from '@/utils'


export interface OrgDetailsProps {
    // orgs: QueryPage<Org> 
}

const OrgDetails = observer((props: OrgDetailsProps) => {
    // const { orgs } = props
    // const orgInput = useInput(NumberModelInput, { syncURL: 'org-id' }, true)

    // if (orgs === undefined) {
    //     return <div>Loading...</div>
    // }

    return (
        <div>In progress</div>
    )
})

export default OrgDetails
