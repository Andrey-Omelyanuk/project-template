import './main.css'
import { useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { BooleanInput } from 'mobx-orm'
import { SidebarLeft } from '@/components/core'
import { UserProfileLink } from '@/components/user'


export const MainPage = observer(() => {

    return (
        <div className={`main left-is-${left_sidebar.value ? 'open': 'closed'}`}>
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
        </div>
    )
})
