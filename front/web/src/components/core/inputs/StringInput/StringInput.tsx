// TODO: MOBX-ORM: rename inputs to model-inputs
import { Input } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { InputGroup, Label } from '@blueprintjs/core'

export interface StringInputViewProps {
    input        : Input<string> 
    disabled    ?: boolean 
    label       ?: string
    placeholder ?: string
    onPressEnter?: () => void
    autoFocus   ?: boolean
}

export const StringInputView = observer((props: StringInputViewProps) => {
    const { input, disabled = false, label, placeholder, onPressEnter, autoFocus } = props

    console.log('test', input.value)
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
                    autoFocus={autoFocus}
                    // TODO: is it make sense to move it into StringInput of MobxORM?
                    value={input.value === undefined || input.value === null ? '' : input.value }
                    onValueChange={onChange}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                />
            </Label>
        )
    } else {
        return (
            <InputGroup
                value={input.value === undefined || input.value === null ? '' : input.value }
                onValueChange={onChange}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                disabled={disabled}
            />
        )
    }
})
