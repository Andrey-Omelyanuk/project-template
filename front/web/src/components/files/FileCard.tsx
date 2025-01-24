import { df, tf } from '@/utils'
import { File } from '@/models/files'
import { useMemo, useState } from 'react'
import { Card } from '@blueprintjs/core'

const FileCard = ({ file }: { file: File }) => {
    const thumbnail = useMemo(() => file.getThumbnail(), [file])
    const preview = useMemo(() => file.getPreview(), [file])
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card 
            className=""
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between text-xs text-slate-600 leading-4">
                <span>{df(file.uploaded_at)}</span><span>{tf(file.uploaded_at)}</span>
            </div>
            { isHovered && preview
                ? <img src={preview.file} alt={file.title} className="w-full h-52 object-cover" />
                : thumbnail
                    ? <img src={thumbnail.file} alt={file.title} className="w-full h-52 object-cover" />
                    : <div className="bg-slate-200 h-52"></div>
            }
            <div>
                { file.title && <div className="text-lg font-semibold"> {file.title } </div> }
                { file.description && <p className="text-sm"> {file.description.length > 120 ? `${file.description.slice(0, 120)}...` : file.description} </p> }
            </div>
        </Card>
    ) 
}

export default FileCard