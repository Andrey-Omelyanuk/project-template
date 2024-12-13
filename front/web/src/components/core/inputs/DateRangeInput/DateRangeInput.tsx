import { DateInput } from 'mobx-orm'
import { DateRangeInput3 } from '@blueprintjs/datetime2'
import { observer } from 'mobx-react-lite'


export interface DateRangeInputProps {
    start   ?: DateInput 
    end     ?: DateInput 
}


// The component is not finished, it is just a placeholder
export const DateRangeInput = observer((props: DateRangeInputProps) => {
    const { 
        start = new DateInput({}), 
        end = new DateInput({}),
    } = props

    const handleRangeChange = (range: [Date, Date]) => {
        if (range[0]) start.set(range[0])
        if (range[1]) end.set(range[1])
    }

    return (
        <>
            <DateRangeInput3 
                value={[start.value, end.value]}
                onChange={handleRangeChange}
            />
        </>
    )
})
