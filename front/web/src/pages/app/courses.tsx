import { use, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { ArrayStringInput, ObjectInput, QueryPage } from 'mobx-orm'
import { Page } from '@/components/core/Page'
import { Course } from '@/models/course'
import { useObjectInput, useQuery } from '@/utils'
import CourseList from '@/components/course/course/CourseList'
import { useNavigate, useParams } from 'react-router'


const CoursesXPage = observer(() => {
    const navigate = useNavigate()
    const params = useParams()
    const [courses, ready] = useQuery(Course, {
        autoupdate: true,
        relations: ArrayStringInput({value: ['chapters.lessons.blocks', ]}),
    }) as [QueryPage<Course>, Promise<void>]
    const courseInput = useObjectInput(ObjectInput, { options: courses }, true)
    use(ready)  // page is ready if orgs are loaded

    useEffect(() => {
        if (courseInput.value !== undefined && courseInput.value !== null) {
            navigate(`/courses/${courseInput.value}`)
        }
    }, [courseInput.value])

    return (
        <Page>
            <div> Courses {params.course_id} </div>
            { params.course_id === undefined && <CourseList courseInput={courseInput} />}
        </Page>
    )
})

export default CoursesXPage
