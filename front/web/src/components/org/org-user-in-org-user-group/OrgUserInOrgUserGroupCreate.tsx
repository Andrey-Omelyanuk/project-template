import { Button, ControlGroup } from '@blueprintjs/core'
import { ArrayStringInput, EQ, ObjectInput, QueryPage } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { Org, OrgUser, OrgUserGroup, OrgUserInOrgUserGroup } from '@/models/org'
import { ModelForm } from '@/utils/form'
import { useModelForm, useObjectInput, useQueryPage } from '@/utils'
import { ObjectSelect } from '@/components/core/inputs'


export interface OrgUserInOrgUserGroupCreateProps {
    orgInput: ObjectInput<Org>
    groupInput: ObjectInput<OrgUserGroup>
    onCreated?: (obj: OrgUserInOrgUserGroup) => void
}

const OrgUserInOrgUserGroupCreate = observer((props: OrgUserInOrgUserGroupCreateProps) => {
    const { orgInput, groupInput, onCreated } = props
    const [orgUsers, ] = useQueryPage(OrgUser, {
        filter: EQ('org_id', orgInput),
        relations: ArrayStringInput({value: ['user', ]}),
        autoupdate: true,
    }) as [QueryPage<OrgUser>, Promise<void>]
    const orgUserInput = useObjectInput(ObjectInput, {
        required: true,
        options: orgUsers,
    })
    const form = useModelForm(() => {
        const form = new ModelForm<OrgUserInOrgUserGroup>()
        const obj = new OrgUserInOrgUserGroup()
        form.inputs['org_user_group_id'] = groupInput
        form.inputs['org_user_id'] = orgUserInput
        form.setObj(obj)
        return form
    })
    const submit = async () => {
        try {
            await form.submit()
            if (!form.errors.length) {
                form.setObj(new OrgUserInOrgUserGroup())
                onCreated && onCreated(form.getObj())
            }
        }
        catch (e) {
            console.error('Failed to add user', e)
        }
    }

    return (
        <ControlGroup>
            <ObjectSelect input={orgUserInput} label={(obj: OrgUser) => `${obj.user.fullName}` } />
            {/* <StringInputView disabled={form.isLoading} input={form.inputs.name} placeholder='Search by name' onPressEnter={submit} /> */}
            <Button intent="success" icon="add" text="Add User" onClick={submit} loading={form.isLoading}/>
        </ControlGroup>
    )
})

export default OrgUserInOrgUserGroupCreate