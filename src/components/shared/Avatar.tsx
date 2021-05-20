import React from 'react'

interface IAvatarProps {
    src: string
    alt: string
}

export const Avatar: React.FC<IAvatarProps> = (props) => {
    return (
        <div role="button" className="w-10 h-10 overflow-hidden rounded-full">
            <img src={props.src || '/default_avatar.jpg'} alt={props.alt || 'Your avatar'} />
        </div>
    )
}
