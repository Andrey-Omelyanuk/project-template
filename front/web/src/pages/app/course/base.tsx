import { createContext, use } from 'react'
import { Course } from '@/models/course'
import { useQuery } from '@/utils'
import { Input, ARRAY, STRING, Query } from 'mobx-orm'
import { Outlet} from 'react-router'


export const CourseContext = createContext<Query<Course>>(null)

const BaseCoursePage = () => {
    const [courses, ready] = useQuery(Course, {
        autoupdate: true,  // TODO MobX-ORM: make it true by default
        relations: new Input(ARRAY(STRING()), {value: ['chapters.lessons.blocks.file.versions', ]}),
    })
    use(ready)

    return (
        <CourseContext.Provider value={courses}>
            <Outlet/>
        </CourseContext.Provider>
    )
}

export default BaseCoursePage
