import './Table.css'
import { NumberInput as NumberModelInput, QueryPage } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { TablePagination } from './TablePagination'
import React from 'react'


export interface TableProps {
    query        : QueryPage<any>
    columnDefs   : any
    input       ?: NumberModelInput<any>
    onRowClick  ?: (item: any) => void
    style       ?: React.CSSProperties 
    actionBlock ?: React.ReactNode
}

export const Table = observer((props: TableProps) => {
    const { query, columnDefs, input, onRowClick, style, actionBlock } = props

    const onRowClickHandler = (item: any) => {
        input.set(item.id)
        onRowClick && onRowClick(item)
    }

    let renderNode = null
    if (query.isLoading) {
        renderNode = <div>Loading...</div>
    }
    else if (query.error) {
        renderNode = <div>Error: {query.error}</div>
    }
    else if (query.items.length === 0) {
        renderNode = <div>No data</div>
    } 
    else {
        renderNode = 
        <table className='table bp5-html-table bp5-compact bp5-interactive bp5-html-table-striped bp5-html-table-bordered'>
            <thead>
                <tr>
                    {columnDefs.map((columnDef: any, index: number) => (
                        <th key={index}>{columnDef.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {query.items.map((item: any, index: number) => (
                    <tr key={index} onClick={() => onRowClickHandler(item)} className={input && input.value === item.id ? 'selected' : ''}>
                        {columnDefs.map((columnDef: any, index: number) => (
                            <td key={index} className={columnDef.className}>{columnDef.data(item)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    }

    return (<div style={style}>
        <div style={{display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center'}}>
            {actionBlock}
            <TablePagination query={query} />
        </div>
        {renderNode}
    </div>)
})
