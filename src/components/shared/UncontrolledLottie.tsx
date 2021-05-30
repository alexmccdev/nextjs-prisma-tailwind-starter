import React from 'react'
import Lottie, { Options } from 'react-lottie'

interface IUncontrolledLottieProps {
    animationData: any
}

class UncontrolledLottie extends React.Component<IUncontrolledLottieProps> {
    render() {
        const defaultOptions: Options = {
            loop: true,
            autoplay: true,
            animationData: this.props.animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid meet',
            },
        }

        return <Lottie options={defaultOptions} height={200} />
    }
}

export default UncontrolledLottie
