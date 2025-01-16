import { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Alignment, Icon, Navbar, NavbarGroup, Tree, TreeNodeInfo } from '@blueprintjs/core'
import { IconNames, IconSize } from '@blueprintjs/icons'
import { NavLink, useLocation, useNavigate } from 'react-router'
import me from '@/services/me'


const menu : TreeNodeInfo[] = [
    { id: '/'       , label: 'Dashboard'        , icon: IconNames.DASHBOARD },
    { id: '/users'  , label: 'Users'            , icon: IconNames.USER},
    { id: '/orgs'   , label: 'Organizations'    , icon: IconNames.GROUP_ITEM},
    { id: '/course' , label: 'Courses'          , icon: IconNames.COLUMN_LAYOUT},
] 

type NodePath = number[]

export interface LeftSidebarProps {
    className?: string
}

const Sidebar = observer((props: LeftSidebarProps) => {
    const { className } = props
    const [needUpdate, setNeedUpdate] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        for (const item of menu) {
            if (item.id !== '/') {
                item.isSelected = location.pathname.startsWith(item.id+'')
            }
            else {
                item.isSelected = location.pathname === '/'
            }
            setNeedUpdate(!needUpdate)  // rerender the component
        } 
    }, [location])
    const handleNodeClick = useCallback(
        (node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
            navigate(node.id as string)
        }, [],
    )

    return (
        <div className={`${className} min-w-60 flex flex-col`} >
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <Navbar.Heading>
                        <Icon icon={IconNames.TREE} size={IconSize.LARGE} />
                        <span className='pl-3'>Blueprint</span>
                    </Navbar.Heading>
                </NavbarGroup>
            </Navbar>
            <Tree contents={menu} onNodeClick={handleNodeClick} className='border-x-2 flex-auto'/>
            <NavLink to='/profile' className='border-x-2 border-t-2 h-12 flex items-center p-4'>
                <Icon icon={IconNames.USER} size={IconSize.LARGE} />
                <h4 className='pl-3'>{me.user_id} {me.org_user_id}</h4>

            </NavLink>
        </div>
    )
})

export default Sidebar
