import { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Alignment, Icon, Navbar, NavbarGroup, Tree, TreeNodeInfo } from '@blueprintjs/core'
import { IconNames, IconSize } from '@blueprintjs/icons'
import { useLocation, useNavigate } from 'react-router'


const menu : TreeNodeInfo[] = [
    { id: '/'       , label: 'Dashboard'        , icon: IconNames.DASHBOARD },
    { id: '/users'  , label: 'Users'            , icon: IconNames.USER},
    { id: '/orgs'   , label: 'Organizations'    , icon: IconNames.GROUP_ITEM},
] 

type NodePath = number[];

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
            item.isSelected = item.id === location.pathname 
            setNeedUpdate(!needUpdate)
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
        </div>
    )
})

export default Sidebar
