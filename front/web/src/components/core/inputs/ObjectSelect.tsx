import { ObjectInput, Model } from 'mobx-orm'
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select'
import { Button, MenuItem } from '@blueprintjs/core'
import { observer } from 'mobx-react-lite'


export interface ObjectSelectProps<M extends Model> {
    input       : ObjectInput<M>
    label      ?: (obj: M) => string
    render     ?: ItemRenderer<M>
    filter     ?: ItemPredicate<M>
}


const defaultRender = <M extends Model>(label: (obj: M) => string) => {
    const render: ItemRenderer<M> = (obj, { handleClick, handleFocus, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
            return null
        }
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                key={obj.id}
                label={label(obj)}
                onClick={handleClick}
                onFocus={handleFocus}
                roleStructure="listoption"
                text={`${obj.id}.`}
            />
        )
    }
    return render
}

const defaultFilter = <M extends Model>(label: (obj: M) => string) => {
    const filter: ItemPredicate<M> = (query, obj, _index, exactMatch) => {
        const normalizedTitle = label(obj).toLowerCase()
        const normalizedQuery = query.toLowerCase()

        if (exactMatch) {
            return normalizedTitle === normalizedQuery
        } else {
            return `${obj.id}. ${normalizedTitle}`.indexOf(normalizedQuery) >= 0
        }
    }
    return filter
}

// The component is not finished, it is just a placeholder
export const ObjectSelect = observer(<M extends Model>(props: ObjectSelectProps<M>) => {
    const { input, label, render, filter } = props

    const onSelect = (item: M) => {
        input.set(item.id)
    }

    if (!input.options) return null
    const obj = input.options?.repository.cache.get(input.value)
    return (
        <Select<M>
            items={input.options?.items}
            itemPredicate={filter ? filter : defaultFilter(label)}
            itemRenderer={render ? render : defaultRender(label)}
            noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
            onItemSelect={onSelect}
        >
            <Button text={obj ? `${label(obj)}`: 'no object'} rightIcon="double-caret-vertical" />
        </Select>
    )
})
