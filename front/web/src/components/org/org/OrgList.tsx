import { Button, Card, CardList, Classes, Icon, Section, SectionCard } from '@blueprintjs/core'
import { QueryPage, NumberInput as NumberModelInput } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { Org } from '@/models/org'
import { useInput } from '@/utils'
import { ChevronRight, IconNames } from '@blueprintjs/icons'
import { DeleteObjectButton } from '@/components/core/inputs/DeleteObject:wButton'


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
                        <Card key={org.id}
                            interactive={true}
                            selected={orgInput.value === org.id}
                            onClick={() => orgInput.set(org.id as number)}
                            className='flex items-center justify-between'
                        >
                            {org.name}
                            <DeleteObjectButton obj={org} onDeleted={() => orgs.load()}/>
                        </Card>
                    )}
                </CardList>
            </SectionCard>
        </Section>
    )
})

export default OrgList
