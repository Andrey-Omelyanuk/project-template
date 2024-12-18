import { observer } from 'mobx-react-lite'
import { User } from '@/models/core'
import me from '@/services/me'


const UserProfilePage = observer(() => {
    const user = User.get(me.user_id) as User | undefined
    return (
        <div>
            <div>{user?.id} | {user?.first_name}</div>
            <button onClick={() => me.logout() }>Logout</button>
        </div>
    )
})

export default UserProfilePage
