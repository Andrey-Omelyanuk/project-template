import './Page.css'
import { reaction } from 'mobx'
import { Query } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

/**
 * Page:
 *  - check if all queries are loaded only once
 *    other times each component will control its own loading state
 */

export interface PageProps {
    queries     ?: Query<any>[]
    children     : React.ReactNode
}

export const Page = observer((props: PageProps) => {
    const { queries = [], children } = props
    const [isReady, setIsReady] = useState(!queries)

    useEffect(() => {
        if (!queries.length) {
            setIsReady(true)
            return
        }
        return reaction(
            () => queries.every(query => !query.isLoading && query.isReady),
            (isReady) => isReady && setIsReady(isReady)
        )
    }, [queries])

    return (
        <div className='page'>
            { !isReady ?  <div> Loading... </div>  : children}
        </div>
    )
})
