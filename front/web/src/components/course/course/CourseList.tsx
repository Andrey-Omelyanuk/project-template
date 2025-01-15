import { Card, CardList, Section, SectionCard } from '@blueprintjs/core'
import { QueryPage, Input, ObjectInput, Query } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { DeleteObjectButton } from '@/components/core/inputs/DeleteObjectButton'
import { Course } from '@/models/course'


export interface CourseListProps {
    courseInput: ObjectInput<Course>
}

const CourseList = observer((props: CourseListProps) => {
    const { courseInput } = props
    return (
        <CardList bordered={true}>
            { courseInput.options.isLoading 
                ? <div>Loading...</div>
                : courseInput.options.items.length === 0
                    ? <Card> No Courses </Card>
                    : courseInput.options.items.map(course => (
                        <Card interactive={true} key={course.id}
                            selected={courseInput.value === course.id}
                            onClick={() => courseInput.set(course.id as number)}
                        >
                            <span>{course.title}</span>
                        </Card>
            ))}
        </CardList>
    )
})

export default CourseList
