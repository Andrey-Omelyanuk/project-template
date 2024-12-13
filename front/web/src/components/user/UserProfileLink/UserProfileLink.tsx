import './UserProfileLink.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { me } from '@/services'
import { User } from '@/models/core'


export interface UserProfileLinkProps {
}


export const UserProfileLink = observer((props: UserProfileLinkProps) => {

    const user = User.get(me.user_id) as User | undefined
    return (
        <Link to='/user-profile' className='user-profile-link'>
            <div> Hello {user?.fullName} </div>
        </Link>
    )
})
