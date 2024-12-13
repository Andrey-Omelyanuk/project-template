import { ObjectInput, Model } from 'mobx-orm'
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select'
import { Button, MenuItem } from '@blueprintjs/core'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { ModelFormContext } from '../ModelForm/ModelFromContext'
import { runInAction } from 'mobx'


export interface ObjectSelectProps<M extends Model> {
    input       : ObjectInput<M>
    labelField ?: string
    objField   ?: string            // field name for ModelForm.obj
    render     ?: ItemRenderer<M>
    filter     ?: ItemPredicate<M>
}


const defaultRender = (field: string) => {
    const render: ItemRenderer<Model> = (obj, { handleClick, handleFocus, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
            return null
        }
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                key={obj.id}
                label={obj[field]}
                onClick={handleClick}
                onFocus={handleFocus}
                roleStructure="listoption"
                text={`${obj.id}.`}
            />
        )
    }
    return render
}

const defaultFilter = (field: string) => {
    const filter: ItemPredicate<Model> = (query, obj, _index, exactMatch) => {
        const normalizedTitle = (''+obj[field]).toLowerCase();
        const normalizedQuery = query.toLowerCase();

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
    const { input, labelField, objField, render, filter } = props
    const modelForm = useContext(ModelFormContext)


    const onSelect = (item: M) => {
        input.set(item.id)
        if (objField && modelForm.obj) {
            runInAction(() => {
                modelForm.obj[objField] = item.id
            })
        }
    }

    return (
        <Select<M>
            items={input.options?.items}
            itemPredicate={filter ? filter : defaultFilter(labelField)}
            itemRenderer={render ? render : defaultRender(labelField)}
            noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
            onItemSelect={onSelect}
        >
            <Button text={input.obj ? `${input.obj.id}. ${input.obj[labelField]}`: 'no object'} rightIcon="double-caret-vertical" />
        </Select>
    )
})
