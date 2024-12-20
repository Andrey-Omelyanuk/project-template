import { Card, CardList, Section, SectionCard } from '@blueprintjs/core'
import { QueryPage, NumberInput as NumberModelInput } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { Org } from '@/models/org'
import { useInput } from '@/utils'


export interface OrgListProps {
    orgs: QueryPage<Org> 
}

const OrgList = observer((props: OrgListProps) => {
    const { orgs } = props
    const orgInput = useInput(NumberModelInput, { syncURL: 'org-id' }, true)

    if (orgs === undefined) {
        return <div>Loading...</div>
    }

    return (
        <Section title="Organizations">
            <SectionCard padded={false}>
                <CardList>
                    { orgs.items.length === 0 && <Card>No Orgs</Card> }
                    { orgs.items.map( org =>
                        <Card interactive={true} selected={orgInput.value === org.id}>{org.name}</Card>
                    )}
                </CardList>
            </SectionCard>
        </Section>
    )
})

export default OrgList
