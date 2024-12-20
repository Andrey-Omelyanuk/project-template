import { Input } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { HTMLSelect, Label } from '@blueprintjs/core'


export interface SelectInputViewProps {
    input        : Input<any, any>
    label       ?: string
    optionKey   ?: string
    optionLabel ?: string
}

// The component is not finished, it is just a placeholder
export const SelectInputView = observer((props: SelectInputViewProps) => {
    const { input, label, optionKey = 'id', optionLabel = 'label' } = props

    if (!input.options?.items) return null
    let options = input.options.items.map((item) => {
        return {value: item[optionKey], label: item[optionLabel]}
    })
    options.unshift({value: null, label: 'Select...'})


    const onChange = (event) => {
        input.serialize(event.currentTarget.value)
    }

    let inputView = <HTMLSelect options={options} value={input.value} onChange={onChange}/>
    if (label)
        inputView = <Label> {label} {inputView} </Label>
    return inputView
})
