import { Link, useParams } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Course } from '@/models/course'


const CoursePage = observer(() => {
    const params = useParams()
    const id = parseInt(params.id)
    // BaseCoursePage has preloaded all courses
    const course = Course.get(id) as Course

    return (
        <>
            <div>Course {id} {course?.title} </div>
            <div>Chapters:</div>
            <ul>
                {course?.chapters.map((chapter) => (
                    <li key={chapter.id}>
                        <Link to={`/course/chapter/${chapter.id}`}>{chapter.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
})

export default CoursePage
