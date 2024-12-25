import { Card, CardList, Section, SectionCard } from '@blueprintjs/core'
import { ObjectInput } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { OrgUserInOrgUserGroup } from '@/models/org'
import { DeleteObjectButton } from '@/components/core/inputs/DeleteObjectButton'


export interface OrgUserInOrgUserGroupListProps {
    input: ObjectInput<OrgUserInOrgUserGroup>
}

const OrgUserInOrgUserGroupList = observer((props: OrgUserInOrgUserGroupListProps) => {
    const { input } = props
    return (
        <Section title="Users">
            <SectionCard padded={false}>
                <CardList>
                    { input.options.isLoading 
                        ? <div> Loading... </div>
                        : input.options.items.length === 0
                            ? <Card>No Users</Card>
                            : input.options.items.map( user =>
                                <Card key={user.id}
                                    interactive={true}
                                    selected={input.value === user.id}
                                    onClick={() => input.set(user.id as number)}
                                    className='flex items-center justify-between'
                                >
                                    {user?.org_user?.user?.fullName}
                                    {/* <DeleteObjectButton obj={org} onDeleted={() => orgInput.options.load()}/> */}
                                </Card>
                            )
                    }
                </CardList>
            </SectionCard>
        </Section>
    )
})

export default OrgUserInOrgUserGroupList
