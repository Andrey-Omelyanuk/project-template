import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Model } from 'mobx-orm'
import { ModelFormContext } from './ModelFromContext'
import { runInAction } from 'mobx'
import { Intent, OverlayToaster, Toaster } from '@blueprintjs/core'
import { toaster } from '@/utils/toaster'


export interface ModelFormProps {
    obj                 ?: Model
    syncURL             ?: boolean | string
    syncLocalStorage    ?: boolean | string
    onApplied           ?: () => void
    children             : React.ReactNode
}


export const ModelForm = observer((props: ModelFormProps) => {
    const { obj, syncURL, syncLocalStorage, onApplied, children } = props

    // const nonFieldErrors = obj?.__errors?.non_field_errors?.length > 0 ? (
    //     <div> error </div>
    // ) : null
    const nonFieldErrors = null

    const [fields, setFields] = useState([])
    const [is_loading, setIsLoading] = useState(false)

    const addField = (field: string, input: any) => {
        setFields([...fields, { field, input }])
    }

    const apply = async () => {
        setIsLoading(true)
        // copy the fields to the obj
        if (fields && obj) {
            runInAction(() => {
                for (const { field, input } of fields) {
                    obj[field] = input.value
                }
            })
        }
        // save the obj
        try {
            await obj.save()
            onApplied && onApplied()
            runInAction(() => {
                for (const { input } of fields) {
                    input.set(undefined)
                }
            });
            (await toaster).show({
                icon: 'saved',
                intent: Intent.SUCCESS,
                message: 'The form has been saved successfully.',
                timeout: 3000
            })
        }
        catch (e) {
            // 400 ignore?
            if (e?.response?.status !== 400) {
                (await toaster).show({
                    icon: "warning-sign",
                    intent: Intent.DANGER,
                    message: "An error occurred while saving the form. Please try again later.",
                    timeout: 3000
                })
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <ModelFormContext.Provider value={{ obj, addField, apply, syncURL, syncLocalStorage }}>
            {   is_loading 
                ? <div>loading...</div> 
                : <> {nonFieldErrors} {children} </>
            }
        </ModelFormContext.Provider>
    )
})
