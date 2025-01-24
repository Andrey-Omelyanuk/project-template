import { observer } from 'mobx-react-lite'
import { File, FileType } from '@/models/files'
import { useParams } from 'react-router'
import VideoPlayer from '@/components/files/VideoPlayer'
import { useMemo } from 'react'


const FilePage = observer(() => {
    const params = useParams()
    const id = parseInt(params.id)
    const file = File.get(id) as File  // BaseFilePage has preloaded all files
    if (!file) {
        return <div>File not found</div>
    }
    
    return (
        <div className='p-4'>
            <div className='text-2xl font-bold'>
                {file?.title}
            </div>
            <div className='text-gray-500'>
                {file?.description}
            </div>
            {file.type === FileType.VIDEO && <VideoPlayer file={file}/>}
            <button className='p-2 mt-4 bg-blue-500 text-white rounded-md'>
                Download All
            </button>
            <button className='p-2 mt-4 bg-blue-500 text-white rounded-md'>
                Rebuild All
            </button>
            <div className='text-lg font-bold mt-4'>
                Versions
            </div>
            { file.versions.map((version) => (
                <div key={version.id} className='mt-4'>
                    <div className='text-lg font-bold'>
                        {version.slug}
                    </div>
                    <button className='p-2 mt-4 bg-blue-500 text-white rounded-md'>
                        Download
                    </button>
                    <button className='p-2 mt-4 bg-blue-500 text-white rounded-md'>
                        Rebuild
                    </button>
                </div>
            ))}
        </div>
    )
})

export default FilePage
