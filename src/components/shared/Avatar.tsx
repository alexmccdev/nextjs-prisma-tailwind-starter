import React from 'react'

interface IAvatarProps {
    src: string
    alt: string
    size: 'small' | 'large'
}

export const Avatar: React.FC<IAvatarProps> = (props) => {
    return (
        <div className={`${props.size === 'small' ? 'w-8 h-8' : 'w-20 h-20'} overflow-hidden rounded-full`}>
            <img src={props.src || '/default_avatar.jpg'} alt={props.alt || 'Your avatar'} />
        </div>
    )
}
