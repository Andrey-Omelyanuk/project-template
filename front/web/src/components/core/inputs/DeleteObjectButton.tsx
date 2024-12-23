import { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Model, timeout } from 'mobx-orm'
import { Button, Intent,  } from '@blueprintjs/core'
import { toaster } from '@/utils/toaster'
import { IconNames } from '@blueprintjs/icons'
import { useModelForm } from '@/utils'
import { ModelFormAction, ModelForm } from '@/utils/form'


export interface DeleteObjectButtonProps {
    obj: Model
    onDeleted?: () => void
}

export const DeleteObjectButton = observer((props: DeleteObjectButtonProps) => {
    const { obj, onDeleted } = props
    const form = useModelForm(() => {
        const form = new ModelForm(
            ModelFormAction.DELETE,
            async () => {
                (await toaster).show({ message: 'Object deleted', intent: Intent.SUCCESS })
                onDeleted && onDeleted()
            },
            async () => {
                (await toaster).show({ message: 'Failed to delete object', intent: Intent.DANGER })
            }
        )
        form.setObj(obj)
        return form
    })

    const deleteHandler = useCallback(async (event) => {
        event.stopPropagation()
        await form.submit()
    }, [obj])

    return (
        <Button
            minimal={true}
            intent={Intent.DANGER}
            icon={IconNames.TRASH}
            onClick={deleteHandler}
            loading={form.isLoading} 
        />
    )
})
