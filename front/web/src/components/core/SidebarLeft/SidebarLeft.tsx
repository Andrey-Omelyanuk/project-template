import './SidebarLeft.css'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { SIDEBAR, sidebar } from '@/sidebar'


const menuItems = [
    {title: 'Dashboard',    url: '/'},
    {title: 'Users',        url: '/users'},
]

export const SidebarLeft = observer(() => {
    return (
        // Bandaid: we have to close sidebar on click
        <div className='sidebar-menu' onClick={()=> sidebar.set(SIDEBAR.OFF)}>
            { menuItems.map( item => {
                return <NavLink key={item.url} className='sidebar-menu-item' to={item.url}>{item.title}</NavLink>
            })}
        </div>
    )
})
