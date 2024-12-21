import { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Model } from 'mobx-orm'
import { Button, Intent,  } from '@blueprintjs/core'
import { toaster } from '@/utils/toaster'
import { IconNames } from '@blueprintjs/icons'


export interface DeleteObjectButtonProps {
    obj: Model
    onDeleted?: () => void
}

export const DeleteObjectButton = observer((props: DeleteObjectButtonProps) => {
    const { obj, onDeleted } = props
    const [isProcessing, setIsProcessing] = useState(false)

    const deleteHandler = useCallback(async (event) => {
        event.stopPropagation()
        setIsProcessing(true)
        try {
            await obj.delete();
            (await toaster).show({ message: 'Object deleted', intent: Intent.SUCCESS })
            onDeleted && onDeleted()
        }
        catch (e) {
            (await toaster).show({ message: 'Failed to delete object', intent: Intent.DANGER })
        }
        finally {
            setIsProcessing(false)
        }
    }, [obj])

    return (
        <Button
            minimal={true}
            intent={Intent.DANGER}
            icon={IconNames.TRASH}
            onClick={deleteHandler}
            loading={isProcessing} 
        />
    )
})
