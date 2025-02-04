import { use } from 'react'
import { observer } from 'mobx-react-lite'
import { useInput, useQuery } from '@/utils'
import { DESC, EQ, ILIKE, LIKE, Input, ARRAY, NUMBER, STRING, ORDER_BY } from 'mobx-orm'
import { File } from '@/models/files'
import FileCard from '@/components/files/FileCard'
import { Link } from 'react-router'
import { StringInputView } from '@/components/core/inputs'


    // @field title          ?: string
    // @field description    ?: string
    // @field uploaded_by_id ?: number
    // @field uploaded_at    ?: string
    // @field type           ?: FileType
    // @field file           ?: string

const FilesPage = observer(() => {
    const searchInput = useInput(STRING(), { syncURL: 'search', debounce: 400 }) as Input<string>
    const [files, ready] = useQuery(File, { 
        relations: new Input(ARRAY(STRING()), {value: ['versions', ]}),
        filter: ILIKE('title', searchInput),
        orderBy: new Input(ARRAY(ORDER_BY()), {value: [['uploaded_at', DESC]]}),
        autoupdate: true,
    })
    use(ready)  // page is ready if orgs are loaded
    console.log('render')
    
    return(
        <>
            <div className='flex p-4 bor'>
                <StringInputView input={searchInput} placeholder='Search...' />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {files.items.map((file: File) => {
                    return (
                        <Link to={`/files/${file.id}`} key={file.id}>
                            <FileCard file={file}/>
                        </Link>
                    )
                })}
            </div>
        </>
    )
})

export default FilesPage
