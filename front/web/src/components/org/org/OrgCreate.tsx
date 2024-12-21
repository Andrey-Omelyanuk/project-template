import { Button, ControlGroup } from '@blueprintjs/core'
import { StringInput } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { Org } from '@/models/org'
import { ModelForm } from '@/utils/form'
import { useModelForm } from '@/utils'
import { StringInputView } from '@/components/core/inputs'


export class CreateOrgForm extends ModelForm<Org> {
    constructor(obj: Org) {
        super()
        this.inputs['name'] = StringInput({value: obj.name})
        this.setObj(obj)
    }
}

export interface OrgCreateProps {
    onCreated?: (org: Org) => void
}

const OrgCreate = observer((props: OrgCreateProps) => {
    const { onCreated } = props

    const form = useModelForm(() => new CreateOrgForm(new Org()))

    const submit = async () => {
        try {
            await form.submit()
            if (!form.errors.length) {
                form.setObj(new Org())
                onCreated && onCreated(form.getObj())
            }
        }
        catch (e) {
            console.error('Failed to create org', e)
        }
    }
    return (
        <div>
        <ControlGroup>
            <StringInputView input={form.inputs.name} placeholder='Name of Organization' onPressEnter={submit}  />
            {/* Loading process */}
            <Button intent="success" icon="add" text="Create" onClick={submit}/>
        </ControlGroup>

        </div>
    )
})

export default OrgCreate
