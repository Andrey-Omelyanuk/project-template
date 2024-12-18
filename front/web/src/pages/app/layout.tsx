import { Suspense, use } from 'react'
import { Outlet } from 'react-router-dom'
import { EQ, NumberInput, Query, timeout } from 'mobx-orm'
import { settings, me } from '@/services' 
import useMobX_ORM from '@/utils/useMobX_ORM'
import { User } from '@/models/core'
import pub_sub from '@/services/pub-sub'
import { ThemeContext, useTheme } from '@/services/theme'

const init = async () => {
    const preload = []
    await settings.ready
    await me.ready
    if (me.user_id !== null && me.user_id !== undefined) {
        await pub_sub.init()
        const userQuery = User.getQuery({
            filter: EQ('id', NumberInput({value: me.user_id})),
            autoupdate: true
        }) as Query<User>
        preload.push(userQuery.ready)
    }
    await Promise.all(preload)
    // await timeout(3000) // for test global loading
}
const ready = init()

const BasePage = () => {
    useMobX_ORM()
    const [theme, _ ] = useTheme()
    use(ready)

    return (
        <ThemeContext.Provider value={theme}>
            <div className={`flex bp5-${theme === 'dark' ? 'dark' : 'light'}`}>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Profile</li>
                        <li>Settings</li>
                    </ul>
                </nav>
                <div className="flex flex-col w-full">
                    <nav> Header Navigation </nav>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </div>
        </ThemeContext.Provider>
    )
}

export default BasePage
