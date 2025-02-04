import { Card, CardList, Section, SectionCard } from '@blueprintjs/core'
import { QueryPage, Input, ObjectInput, NumberDescriptor } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { Org } from '@/models/org'
import { DeleteObjectButton } from '@/components/core/inputs/DeleteObjectButton'


export interface OrgListProps {
    orgInput: ObjectInput<number, Org>
}

const OrgList = observer((props: OrgListProps) => {
    const { orgInput } = props

    return (
        <Section title="Organizations">
            <SectionCard padded={false}>
                <CardList>
                    { orgInput.options.isLoading 
                        ? <div> Loading... </div>
                        : orgInput.options.items.length === 0
                            ? <Card>No Orgs</Card>
                            : orgInput.options.items.map( org =>
                                <Card key={org.id}
                                    interactive={true}
                                    selected={orgInput.value === org.id}
                                    onClick={() => orgInput.set(org.id as number)}
                                    className='flex items-center justify-between'
                                >
                                    {org.name}
                                    <DeleteObjectButton obj={org} onDeleted={() => orgInput.options.load()}/>
                                </Card>
                            )
                    }
                </CardList>
            </SectionCard>
        </Section>
    )
})

export default OrgList
