import { use } from 'react'
import { useQuery } from '@/utils'
import { ArrayStringInput } from 'mobx-orm'
import { Outlet} from 'react-router'
import { File } from '@/models/files'



const BaseFilePage = () => {
    const [files, ready] = useQuery(File, {
        autoupdate: true,
        relations: ArrayStringInput({value: ['versions', ]}),
    })
    use(ready)

    return (
        <Outlet/>
    )
}

export default BaseFilePage
