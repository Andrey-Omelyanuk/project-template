import React from 'react'
import { Input, Model } from 'mobx-orm'


interface ModelFormContextProps {
    obj                 ?: Model
    addField            ?: (field: string, input: Input<any, any>) => void
    apply               ?: () => void
    syncURL             ?: boolean | string
    syncLocalStorage    ?: boolean | string
}

export const ModelFormContext = React.createContext<ModelFormContextProps>({
    obj             : null,
    addField        : () => {},
    apply           : () => {},
    syncURL         : false,
    syncLocalStorage: false
})
