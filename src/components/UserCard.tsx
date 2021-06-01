import { SafeUser } from '@types'
import { Avatar } from './shared/Avatar'

interface IUserCardProps {
    user: SafeUser
}

const UserCard: React.FC<IUserCardProps> = (props) => {
    return (
        <div className="flex flex-col items-center card">
            <Avatar size="large" src={props.user.avatar || '/default_avatar.jpg'} alt={props.user.name} />
            <p className="mt-4">{props.user.name}</p>
        </div>
    )
}

export default UserCard
