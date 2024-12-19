import { observer } from 'mobx-react-lite'
import { User } from '@/models/core'
import me from '@/services/me'
import { Button } from '@blueprintjs/core'

const UserProfilePage = observer(() => {
    const user = User.get(me.user_id) as User | undefined
    return (
        <div className='p-4'>
            <div>{user?.id} | {user?.fullName}</div>
            <Button onClick={() => me.logout() }>Logout</Button>
        </div>
    )
})

export default UserProfilePage
