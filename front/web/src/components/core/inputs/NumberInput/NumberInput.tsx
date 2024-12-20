// import { useContext } from 'react'
import { NumberInput } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
// import { ModelFormContext } from '../ModelForm/ModelFromContext'

export interface NumberInputProps {
    input   : NumberInput<any>
    field  ?: string
}

export const NumberInputUI = observer((props: NumberInputProps) => {
    const { input } = props
    // const modelForm = useContext(ModelFormContext)

    return (
        // TODO: "serializer" should be inside "set" ? the "set" should allow any type of arg
        <input type='number' value={input.value} onChange={(e) => { input.serialize(e.target.value) }} />
    )
})
