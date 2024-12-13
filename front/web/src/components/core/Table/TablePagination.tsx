import './Table.css'
import { QueryPage } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { Button } from '@blueprintjs/core'
import { SelectInputView } from '../inputs'
import { PageSizeOptions } from '@/models/core/table'


const MAX_ITEM_COUNT = 7

export interface TablePaginationProps {
    query: QueryPage<any>
}

// good example
// https://gist.github.com/prashnts/8959ff4ab1d825de2d3f881ff163a25b
export const TablePagination = observer((props: TablePaginationProps) => {
    const { query } = props

    // fix the limit options if it is not set by the user
    if (query.limit.options === undefined) {
        (query.limit as any).options  = PageSizeOptions
    }


    const pages = []
    if (query.totalPages > MAX_ITEM_COUNT) {
        <div>TODO: Implement pagination for a lot of pages.</div>
    } else {
        for(let i = 1; i <= query.totalPages; i++) {
            pages.push(<Button text={i} key={i} intent={i == query.currentPage ? 'primary' : undefined} onClick={() => query.setPage(i)}/>)
        }
    }

    return (<div style={{display: 'flex', gap: '10px', alignItems: 'center', padding: '10px'}}>
        <div className='pt-button-group'>
            <Button icon='chevron-left' disabled={query.isFirstPage} onClick={() => query.goToPrevPage()}/>
            {pages}
            <Button icon='chevron-right' disabled={query.isLastPage} onClick={() => query.goToNextPage()}/>
        </div>
        Size <SelectInputView input={query.limit} />
    </div>
    )
})
