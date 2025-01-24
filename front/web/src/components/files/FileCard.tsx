import { df, tf } from '@/utils'
import { File } from '@/models/files'


const FileCard = ({ file }: { file: File }) => {
    return (
        <div className="">
            <div className="flex justify-between text-xs text-slate-600 leading-4">
                <span>{df(file.uploaded_at)}</span><span>{tf(file.uploaded_at)}</span>
            </div>
            <div className="bg-slate-200 h-52"></div>
            <div>
                { file.title && <div className="text-lg font-semibold"> {file.title } </div> }
                { file.description && <p className="text-sm"> {file.description} </p> }
            </div>
        </div>
    ) 
}

export default FileCard