import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Model, StringInput } from 'mobx-orm'
import { Button, Intent,  } from '@blueprintjs/core'
import { toaster } from '@/utils/toaster'
import { IconNames } from '@blueprintjs/icons'
import { useModelForm } from '@/utils'
import { ModelFormAction, ModelForm } from '@/utils/form'


export interface ObjectFieldInlineInputProps<T extends Model> {
    obj      : T 
    field    : string
    onDone  ?: () => void
}

export const ObjectFieldInlineInput = observer(<T extends Model>(props: ObjectFieldInlineInputProps<T>) => {
    const { obj, field, onDone } = props
    const form = useModelForm(() => {
        const form = new ModelForm(
            ModelFormAction.SAVE,
            async () => { // success handler
                (await toaster).show({ message: 'Object deleted', intent: Intent.SUCCESS })
                onDone && onDone()
            },
            async () => { // error handler
                (await toaster).show({ message: 'Failed to delete object', intent: Intent.DANGER })
            }
        )
        form.inputs[field] = StringInput({value: obj[field]})
        form.setObj(obj)
        return form
    })

    const handleKeyPress = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            await form.submit() 
        }
    }, [form])

    return (
        <div className='flex items-center' onClick={(event) => event.stopPropagation()}>
            <input autoFocus
                className='flex-auto'
                value={form.inputs[field].value}
                onChange={(event) => form.inputs[field].setFromString(event.target.value)}
                onKeyUp={handleKeyPress}
                disabled={form.isLoading}
            />
            <Button
                minimal={true}
                intent={Intent.SUCCESS}
                icon={IconNames.SMALL_TICK}
                disabled={!form.isReady}
                loading={form.isLoading}
                onClick={async () => await form.submit()}
                />
            <Button
                minimal={true}
                intent={Intent.DANGER}
                icon={IconNames.CROSS}
                disabled={form.isLoading}
                onClick={() => onDone && onDone()}
            />
        </div>
    )
})
