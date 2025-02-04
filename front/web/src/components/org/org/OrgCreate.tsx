import { Button, ControlGroup } from '@blueprintjs/core'
import { Input, STRING } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { Org } from '@/models/org'
import { ModelForm } from '@/utils/form'
import { useModelForm } from '@/utils'
import { StringInputView } from '@/components/core/inputs'


export interface OrgCreateProps {
    onCreated?: (org: Org) => void
}

const OrgCreate = observer((props: OrgCreateProps) => {
    const { onCreated } = props
    const form = useModelForm(() => {
        const form = new ModelForm<Org>()
        const obj = new Org()
        form.inputs['name'] = new Input(STRING(), {value: obj.name})
        form.setObj(obj)
        return form
    })
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
        <ControlGroup>
            <StringInputView disabled={form.isLoading} input={form.inputs.name} placeholder='Name of Organization' onPressEnter={submit} />
            <Button intent="success" icon="add" text="Create" onClick={submit} loading={form.isLoading}/>
        </ControlGroup>
    )
})

export default OrgCreate
