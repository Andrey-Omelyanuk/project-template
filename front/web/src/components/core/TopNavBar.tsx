import { Link } from 'react-router'
import { observer } from 'mobx-react-lite'
import {
    Alignment,
    Button,
    Navbar,
    NavbarGroup,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'


const TopNavBar = observer(() => {
    return (
        <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
                <div className='md:hidden'>
                    <Button icon={IconNames.MENU} minimal={true}/>
                </div>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <Link to='/calendar'><Button minimal={true} icon={IconNames.CALENDAR}/></Link>
                <Link to='/settings'><Button minimal={true} icon={IconNames.COG}/></Link>
            </NavbarGroup>
        </Navbar>
    )
})

export default TopNavBar
