import './main.css'
import { useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { BooleanInput } from 'mobx-orm'
import { SidebarLeft } from '@/components/core'
import { UserProfileLink } from '@/components/user'
import { sidebar } from '@/sidebar'
import { pub_sub } from '@/services'


export const MainPage = observer(() => {
    const left_sidebar = useMemo(() => BooleanInput({value: true, syncLocalStorage: 'left_sidebar'}), [])
    useEffect(() => {
        pub_sub.init()
    }, [])

    return (
        <div className={`main right-is-${sidebar.value ? 'open' : 'closed'} left-is-${left_sidebar.value ? 'open': 'closed'}`}>
        {/* main__left_placeholder overlaps main__left-sidebar we need it for good animation */}
        <div className="main__left_placeholder"></div>
        <div className="main__left-sidebar">
            <div className='main__left-sidebar-header' onClick={() => left_sidebar.set(!left_sidebar.value)}>
                <div>Logo</div>
            </div>
            <SidebarLeft/>
            <UserProfileLink/>
        </div>
        <div className="main__center">
            {/* Manual Analize */}
            {/* Auto Analize */}
            {/* News Objects */}
            {/* News Events */}
            {/* News Metrics */}
            <Outlet/>
        </div>
            {/* main__right_placeholder is just empty space, it helps us draw correct width for main_center */}
        <div className="main__right_placeholder"></div>
        <div className="main__right-sidebar">
            { sidebar.component }
            {/* User */}
            {/* Source */}
            {/* Page */}
        </div>
        </div>
    )
})
