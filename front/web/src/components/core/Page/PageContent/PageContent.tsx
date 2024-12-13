import './PageContent.css'
import { Query } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'


export interface PageContentProps {
    queries     ?: Query<any>[]
    children     : React.ReactNode
}

export const PageContent = observer((props: PageContentProps) => {
    const { queries, children } = props
    const [isReady, setIsReady] = useState(false)
    if (!isReady && (!queries || queries.every(query => !query.isLoading && query.isReady))) {
        setIsReady(true)
    }
    return (
        <div className='page-content' >
            { !isReady ?  <div>Loading...</div> : children}
        </div>
    )
})
