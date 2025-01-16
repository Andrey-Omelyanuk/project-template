import { observer } from 'mobx-react-lite'
import { CourseChapter } from '@/models/course'
import { Link, useParams } from 'react-router'


const ChapterPage = observer(() => {
    const params = useParams()
    const id = parseInt(params.id)
    // BaseCoursePage has preloaded all courses
    const chapter = CourseChapter.get(id) as CourseChapter

    return (
        <>
            <div>Chapter: {chapter?.title}</div>
            <div>Lessons:</div>
            <ul>
                {chapter?.lessons.map((lesson) => (
                    <li key={lesson.id}>
                        <Link to={`/course/lesson/${lesson.id}`}>{lesson.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
})

export default ChapterPage
