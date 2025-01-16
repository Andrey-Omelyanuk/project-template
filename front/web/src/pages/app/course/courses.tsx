import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { observer } from 'mobx-react-lite'
import { ObjectInput } from 'mobx-orm'
import { useObjectInput } from '@/utils'
import CourseList from '@/components/course/course/CourseList'
import { reaction } from 'mobx'
import { CourseContext } from './base'


const CoursesPage = observer(() => {
    const navigate = useNavigate()
    const courses = useContext(CourseContext)
    const courseInput = useObjectInput(ObjectInput, { options: courses }, true)

    useEffect(() => {
        // it is instead of link, if course is selected, navigate to course page
        return reaction(() => courseInput.value, (value) => {
            if (value !== undefined && value !== null) {
                navigate(`/course/${value}`)
            }
        })
    }, [courseInput])

    return (
        <>
            <div> Courses </div>
            <CourseList courseInput={courseInput}/>
        </>
    )
})

export default CoursesPage
