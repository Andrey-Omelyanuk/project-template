import { Suspense, use } from 'react'
import { Outlet } from 'react-router-dom'
import { EQ, Input, NUMBER, Query, timeout } from 'mobx-orm'
import me from '@/services/me' 
import useMobX_ORM from '@/utils/useMobX_ORM'
import { User } from '@/models/core'
import pub_sub from '@/services/pub-sub'
import { ThemeContext, useTheme } from '@/services/theme'
import LeftSidebar from '@/components/core/Sidebar/Sidebar'
import TopNavBar from '@/components/core/TopNavBar'


const init = async () => {
    const preload  = [timeout(1000), ] // stay on loading screen for 1s for remove flicker 
    await me.init()
    if (me.user_id !== null && me.user_id !== undefined) {
        // await pub_sub.init()
        const userQuery = User.getQuery({
            filter: EQ('id', new Input(NUMBER(), { value: me.user_id})),
            autoupdate: true
        }) as Query<User>
        preload.push(userQuery.ready())
    }
    await Promise.all(preload)
    // await timeout(1000) // use for test loading screen 
}
const ready = init()

const BasePage = () => {
    useMobX_ORM()
    const [theme, _ ] = useTheme()
    use(ready)

    return (
        <ThemeContext.Provider value={theme}>
            <div className={`h-screen flex bp5-${theme === 'dark' ? 'dark' : 'light'}`}>
                <LeftSidebar className='hidden md:flex'/>
                <div className="flex flex-col w-full">
                    <TopNavBar/>
                    <Suspense fallback={<div>Loading...</div>}>
                        <div className='flex-auto overflow-y-auto'>
                            <Outlet/>
                        </div>
                    </Suspense>
                </div>
            </div>
        </ThemeContext.Provider>
    )
}

export default BasePage
