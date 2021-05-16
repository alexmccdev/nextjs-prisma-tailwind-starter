import React from 'react'

interface IAvatarProps {
    src: string
    alt: string
}

export const Avatar: React.FC<IAvatarProps> = (props) => {
    return (
        <div role="button" className="w-10 h-10 rounded-full overflow-hidden">
            <img src={props.src} alt={props.alt || 'Your avatar'} />
        </div>
    )
}
