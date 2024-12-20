// TODO: MOBX-ORM: rename inputs to model-inputs
import { StringInput } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { InputGroup, Label } from '@blueprintjs/core'

export interface StringInputViewProps {
    input        : StringInput
    label       ?: string
    placeholder ?: string
}

export const StringInputView = observer((props: StringInputViewProps) => {
    const { input, label, placeholder } = props

    const onChange = (value: string) => {
        input.set(value)
    }

    if (label) {
        return (
            <Label>
                {label}
                <InputGroup value={input.value} onValueChange={onChange} placeholder={placeholder} />
            </Label>
        )
    } else {
        return (
            <InputGroup value={input.value} onValueChange={onChange} placeholder={placeholder} />
        )
    }

})
