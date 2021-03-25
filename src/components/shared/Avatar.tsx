import Image from 'next/image'
import React from 'react'

interface IAvatarProps {
    src: string
    alt: string
}

export const Avatar: React.FC<IAvatarProps> = (props) => {
    return (
        <div role="button" className="w-10 h-10 rounded-full overflow-hidden">
            <Image src={props.src} alt={props.alt || 'Your avatar'} width={200} height={200} />
        </div>
    )
}
