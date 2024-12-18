import {
    Section,
    SectionCard,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

const LandingPage = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 '>
                <Section icon={IconNames.BOOK} title="Basil" subtitle={"Ocimum basilicum"} >
                    <SectionCard padded={true}> Some text A</SectionCard>
                    <SectionCard padded={true}> Some text B</SectionCard>
                </Section>
                <Section icon={IconNames.BOOK} title="Basil" subtitle={"Ocimum basilicum"} >
                    <SectionCard padded={true}> Some text A</SectionCard>
                    <SectionCard padded={true}> Some text B</SectionCard>
                </Section>
                <Section icon={IconNames.BOOK} title="Basil" subtitle={"Ocimum basilicum"} >
                    <SectionCard padded={true}> Some text A</SectionCard>
                    <SectionCard padded={true}> Some text B</SectionCard>
                </Section>
                <Section icon={IconNames.BOOK} title="Basil" subtitle={"Ocimum basilicum"} >
                    <SectionCard padded={true}> Some text A</SectionCard>
                    <SectionCard padded={true}> Some text B</SectionCard>
                </Section>
                <Section icon={IconNames.BOOK} title="Basil" subtitle={"Ocimum basilicum"} >
                    <SectionCard padded={true}> Some text A</SectionCard>
                    <SectionCard padded={true}> Some text B</SectionCard>
                </Section>
                <Section icon={IconNames.BOOK} title="Basil" subtitle={"Ocimum basilicum"} >
                    <SectionCard padded={true}> Some text A</SectionCard>
                    <SectionCard padded={true}> Some text B</SectionCard>
                </Section>
                <Section icon={IconNames.BOOK} title="Basil" subtitle={"Ocimum basilicum"} >
                    <SectionCard padded={true}> Some text A</SectionCard>
                    <SectionCard padded={true}> Some text B</SectionCard>
                </Section>
                <Section icon={IconNames.BOOK} title="Basil" subtitle={"Ocimum basilicum"} >
                    <SectionCard padded={true}> Some text A</SectionCard>
                    <SectionCard padded={true}> Some text B</SectionCard>
                </Section>
            </div>
        </>
    )
}
export default LandingPage
