import { Lesson } from '@/models/course'
import { Card } from '@blueprintjs/core'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router'


const LessonPage = observer(() => {
    const params = useParams()
    const id = parseInt(params.id)
    // BaseCoursePage has preloaded all courses
    const lesson = Lesson.get(id) as Lesson 

    return (
        <>
            <div>Lesson {lesson?.title}</div>

            {lesson?.blocks.map((block) => (
                <Card key={block.id}>

                    <div>{block.index}</div>
                    <div>{block.type}</div>
                    <div>{block.title}</div>
                    <div>{block.text}</div>
                    <div> Files:  type {block.file?.type}
                        {block.file?.versions.map((version) => (
                            <div key={version.id}>
                                <div>{version.slug}</div>
                                <div>{version.file}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            ))}

        </>
    )
})

export default LessonPage
