import { DateInput } from 'mobx-orm'
import { DateInput3 } from '@blueprintjs/datetime2'
import { observer } from 'mobx-react-lite'
import { Label } from '@blueprintjs/core'
import { DATETIME_FORMAT } from '@/utils'


export interface DateTimeInputViewProps {
    input: DateInput 
    label?: string
}


export const DateTimeInputView = observer((props: DateTimeInputViewProps) => {
    const { input, label } = props

    const handleChange = (date: string) => {
        if (date === null)
            input.set(undefined)
        else
            input.serialize(date)
    }

    let inputView = <DateInput3
        value               = {input.toString()}
        onChange            = {handleChange}
        placeholder         = {DATETIME_FORMAT}
        dateFnsFormat       = {DATETIME_FORMAT}
        showTimezoneSelect  = {true}
        showActionsBar      = {true}
        timePickerProps     = {{ useAmPm: true, showArrowButtons: true }}
        />
    if (label)
        inputView = <Label> {label} {inputView} </Label>
    return inputView
})
