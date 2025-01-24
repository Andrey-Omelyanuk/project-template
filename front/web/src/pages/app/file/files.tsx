import { use } from 'react'
import { observer } from 'mobx-react-lite'
import { useQuery } from '@/utils'
import { ArrayStringInput } from 'mobx-orm'
import { File } from '@/models/files'
import FileCard from '@/components/files/FileCard'
import { Link } from 'react-router'


const FilesPage = observer(() => {

    const [files, ready] = useQuery(File, { 
        relations: ArrayStringInput({value: ['versions', ]}),
        autoupdate: true,
    })
    use(ready)  // page is ready if orgs are loaded
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {files.items.map((file: File) => {
                return (
                    <Link to={`/files/${file.id}`} key={file.id}>
                        <FileCard file={file}/>
                    </Link>
                )
            })}
        </div>
    )
})

export default FilesPage
