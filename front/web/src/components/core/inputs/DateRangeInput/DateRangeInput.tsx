import { Input, DATE } from 'mobx-orm'
import { DateRangeInput3 } from '@blueprintjs/datetime2'
import { observer } from 'mobx-react-lite'


export interface DateRangeInputProps {
    start   ?: Input<Date>
    end     ?: Input<Date> 
}


// The component is not finished, it is just a placeholder
export const DateRangeInput = observer((props: DateRangeInputProps) => {
    const { 
        start = new Input(DATE()), 
        end = new Input(DATE()),
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
