import React from 'react'

interface IModalProps {
    hide: () => void
}

const Modal: React.FC<IModalProps> = (props) => {
    return (
        <>
            <div className="fixed inset-0 z-40 flex items-center justify-center px-4 overflow-x-hidden overflow-y-hidden outline-none focus:outline-none">
                <div className="relative z-50 max-w-3xl mx-auto">
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-sm outline-none focus:outline-none">
                        <div className="relative flex-auto p-6">{props.children}</div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-30 bg-black opacity-25"></div>
        </>
    )
}

export default Modal
