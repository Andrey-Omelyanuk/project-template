import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { EQ, NumberInput, Query } from 'mobx-orm'
import { settings, me } from '@/services' 
import useMobX_ORM from '@/utils/useMobX_ORM'
import { useQuery } from '@/utils/mobx'
import { User } from '@/models/core'

// TODO:
// 1. load init data - settings, me, etc
// 2. global loading screen
// 3. global error screen
// 4. global notification
export const BasePage = observer(() => {
    useMobX_ORM()

    // TODO: the page is reloaded few times
    const [user] = useState(() => {
        return User.getQuery({
            filter: EQ('id', NumberInput({value: me.user_id})),
            autoupdate: true
        })
    })

    return (
      <>
        { !settings.is_ready || !me.is_ready || me.shoudBeAuthenticated() || user.isLoading
            && <div> loading </div>
        }
        <Outlet/>
      </>
    )
})
