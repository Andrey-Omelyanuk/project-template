import { Link, Outlet } from 'react-router'
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    Intent,
    Icon,
    Divider
} from '@blueprintjs/core'
import { IconNames, IconSize } from '@blueprintjs/icons'

const PublicLayout = () => {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <Link to="/landing"> 
                        <Navbar.Heading>
                            <Icon icon={IconNames.TREE} size={IconSize.LARGE} />
                            <span className='pl-3'>Blueprint</span>
                        </Navbar.Heading>
                    </Link>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Link to="/landing/pricing"> 
                        <Button className={Classes.MINIMAL} text="Pricing" />
                    </Link>
                    <Link to="/landing/about"> 
                        <Button className={Classes.MINIMAL} text="About" />
                    </Link>
                    <NavbarDivider />
                    <Link to="/"> 
                        <Button text="Log In" intent={Intent.PRIMARY}/>
                    </Link>
                </NavbarGroup>
            </Navbar>
            <div className='overflow-y-auto p-4'>
                <Outlet/>
                <Divider/>
                <footer>
                    <p>&copy; 2023 Your Company. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}

export default PublicLayout
