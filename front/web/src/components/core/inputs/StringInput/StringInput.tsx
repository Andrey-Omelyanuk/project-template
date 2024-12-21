// TODO: MOBX-ORM: rename inputs to model-inputs
import { Input } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { InputGroup, Label } from '@blueprintjs/core'

export interface StringInputViewProps {
    input        : Input<string> 
    label       ?: string
    placeholder ?: string
    onPressEnter?: () => void
}

export const StringInputView = observer((props: StringInputViewProps) => {
    const { input, label, placeholder, onPressEnter } = props

    const onChange = (value: string) => {
        input.set(value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onPressEnter && onPressEnter()
        }
    }

    if (label) {
        return (
            <Label>
                {label}
                <InputGroup
                    value={input.value}
                    onValueChange={onChange}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                />
            </Label>
        )
    } else {
        return (
            <InputGroup
                value={input.value}
                onValueChange={onChange}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
            />
        )
    }
})
