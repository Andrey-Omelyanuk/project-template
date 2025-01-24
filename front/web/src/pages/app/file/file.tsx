import { use, useMemo } from 'react'
import { useParams } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Button, Card, CardList, Icon, Intent, Section, SectionCard, Tooltip } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { File, FileType } from '@/models/files'
import VideoPlayer from '@/components/files/VideoPlayer'
import { useInput, useObjectInput, useQuery } from '@/utils'
import { ArrayStringInput, DESC, EQ, NumberInput, ObjectInput, OrderByInput } from 'mobx-orm'


const FilePage = observer(() => {
    const params = useParams()
    const idInput = useInput(NumberInput, { value: parseInt(params.id) })
    const [files, ready] = useQuery(File, {
        autoupdate: true,
        filter: EQ('id', idInput),
        relations: ArrayStringInput({value: ['versions', ]}),
    })
    use(ready)
    const file = useMemo(() => files.items[0], [files.items]) 

    if (!file) {
        return <div>File not found</div>
    }
    
    return (
        <div className='p-4'>
            {file.type === FileType.VIDEO && <VideoPlayer file={file}/>}
            <div className='text-2xl font-bold mt-2'>
                {file?.title}
            </div>
            <p className='text-gray-500'>
                {file?.description}
            </p>

            <Section title="Versions"  rightElement={<>
                    <Button text='Rebuild All' minimal={true} intent={Intent.WARNING} icon={IconNames.REPEAT} />
                    <Button text='Download All' minimal={true} intent={Intent.PRIMARY} icon={IconNames.ARCHIVE} />
                </>}>
                <SectionCard padded={false}>
                    <CardList compact={true}>
                        {file.versions.map((version) => (
                            <Card key={version.id}>
                                <span className='flex-auto'>{version.slug}</span>
                                <Tooltip content="Rebuild">
                                    <Button minimal={true} intent={Intent.WARNING} icon={IconNames.REPEAT} />
                                </Tooltip>
                                <Tooltip content="Download">
                                    <Button minimal={true} intent={Intent.PRIMARY} icon={IconNames.ARCHIVE} />
                                </Tooltip>
                            </Card>
                        ))}

                    </CardList>
                </SectionCard>
            </Section>
            <Card>
                <Button text='Delete All' intent={Intent.DANGER} icon={IconNames.TRASH} />
            </Card>
        </div>
    )
})

export default FilePage
