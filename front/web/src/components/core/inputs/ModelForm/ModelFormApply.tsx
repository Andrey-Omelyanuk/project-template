import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { ModelFormContext } from './ModelFromContext'


export interface ModelFormApplyProps {
    children : React.ReactNode
}


export const ModelFormApply = observer((props: ModelFormApplyProps) => {
    const { children } = props
    const modelForm = useContext(ModelFormContext)

    return (
        <div onClick={modelForm.apply}>
            { children }
        </div>
    )
})
