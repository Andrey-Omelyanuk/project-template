import { Button, ControlGroup } from '@blueprintjs/core'
import { StringInput } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { Org } from '@/models/org'
import { ModelForm } from '@/utils/form'
import { useModelForm } from '@/utils'
import { StringInputView } from '@/components/core/inputs'


export class CreateOrgForm extends ModelForm<Org> {
    constructor(obj: Org) {
        super(obj)
        this.inputs['name'] = StringInput({value: obj.name})
    }
}

export interface OrgCreateProps {
    onCreated?: (org: Org) => void
}

const OrgCreate = observer((props: OrgCreateProps) => {
    const { onCreated } = props

    const form = useModelForm(() => new CreateOrgForm(new Org()))

    const submit = async () => {
        await form.submit()
        if (!form.isError && onCreated) {
            onCreated(form.obj)
        }
    }

    return (
        <ControlGroup>
            <StringInputView input={form.inputs.name}/>
            <Button intent="success" icon="add" text="Add" onClick={submit}/>
        </ControlGroup>
    )
})

export default OrgCreate
