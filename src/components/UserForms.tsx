import Modal from '@components/shared/Modal'
import useToast from '@hooks/useToast'
import axios from 'axios'
import { signIn, signOut } from 'next-auth/client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useModal } from 'react-modal-hook'

interface ILoginFormProps {}

export const LoginForm: React.FC<ILoginFormProps> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm({ mode: 'onChange' })

    const onSubmit = async (loginData: { email: string }) => {
        await signIn('email', { ...loginData, callbackUrl: '/' })
    }

    console.log(isDirty, isValid, errors)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-4">Login</h2>
            <label htmlFor="email" className="flex flex-col font-semibold">
                Enter your email address to sign in or create an account
            </label>
            <input
                type="email"
                className="w-full"
                id="email"
                placeholder="alexmcc.dev@gmail.com"
                {...register('email', { required: true })}
            />
            {errors.email && <p className="text-error">Email is required</p>}
            <div className="flex mt-4">
                <button className="btn btn-primary" type="submit" disabled={!isDirty || !isValid}>
                    Login
                </button>
            </div>
        </form>
    )
}

interface ILogoutFormProps {}

export const LogoutForm: React.FC<ILogoutFormProps> = (props) => {
    return (
        <div className="border rounded mb-6">
            <div className="p-4 border-b flex flex-col">
                <h2>Logout</h2>
                <p className="my-2">Logout of this device.</p>
            </div>
            <div className="py-2 px-4 flex justify-end bg-gray-50 min-h-16">
                <button className="btn btn-error self-center" onClick={() => signOut()}>
                    Logout
                </button>
            </div>
        </div>
    )
}

interface IAdministerNameFormProps {
    name: string
    maxLength: number
    updateName: ({ name: string }) => {}
}

export const AdministerNameForm: React.FC<IAdministerNameFormProps> = (props) => {
    const {
        register,
        handleSubmit,
        formState: { isDirty, isSubmitSuccessful },
        reset,
    } = useForm({
        defaultValues: { name: props.name },
    })

    // useState and useEffect handles the form reset logic
    const [submittedData, setSubmittedData] = useState<{ name: string | null }>({
        name: props.name,
    })

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ ...submittedData })
        }
    }, [isSubmitSuccessful, submittedData, reset])

    return (
        <form
            onSubmit={handleSubmit((e) => {
                setSubmittedData(e)
                props.updateName(e)
            })}
        >
            <div className="border rounded mb-6">
                <div className="p-4 border-b flex flex-col">
                    <h2>Your Name</h2>
                    <p className="my-2">Please enter your full name, or a display name you are comfortable with.</p>
                    <input
                        type="text"
                        className="max-w-xs"
                        maxLength={props.maxLength}
                        {...register('name', { maxLength: props.maxLength })}
                    />
                </div>
                <div className="py-2 px-4 flex justify-between bg-gray-50 min-h-16">
                    <p className="self-center">Please use 32 characters at maximum.</p>
                    <button className="btn btn-success self-center" disabled={!isDirty}>
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}

interface IAdministerAvatarForm {
    avatar: string
    updateAvatar: ({ avatar: string }) => {}
    defaultAvatar: string
}

export const AdministerAvatarForm: React.FC<IAdministerAvatarForm> = (props) => {
    const [file, setFile] = useState(null)
    const [showModal, hideModal] = useModal(
        () => (
            <AvatarCropperModal
                file={file}
                hideModal={() => {
                    hideModal()
                    setFile(null)
                }}
                updateAvatar={props.updateAvatar}
            />
        ),
        [file]
    )

    const { getInputProps, open } = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: (acceptedFiles: any[]) => {
            setFile(
                Object.assign(acceptedFiles[0], {
                    preview: URL.createObjectURL(acceptedFiles[0]),
                })
            )
        },
    })

    useEffect(() => {
        !!file ? showModal() : hideModal()
    }, [file])

    return (
        <div className="border rounded mb-6">
            <div className="flex justify-between p-4 border-b">
                <div>
                    <h2>Your Avatar</h2>
                    <p className="my-2">
                        This is your avatar. <br /> Click on the avatar to upload a custom one from your files.
                    </p>
                </div>
                <img
                    role="button"
                    className="self-center w-20 h-20 border rounded-full hover:opacity-70"
                    src={props.avatar || props.defaultAvatar}
                    onClick={open}
                />
                <input {...getInputProps()} />
            </div>
            <div className="py-2 px-4 flex justify-between bg-gray-50 min-h-16">
                <p className="self-center">An avatar is optional but strongly recommended.</p>
            </div>
        </div>
    )
}

interface IAvatarCropperModal {
    file: any
    hideModal: () => void
    updateAvatar: ({ avatar: string }) => void
}

export const AvatarCropperModal: React.FC<IAvatarCropperModal> = (props) => {
    const [isUploading, setIsUploading] = useState(false)
    const { showError } = useToast()

    const [upImg] = useState(props.file.preview)
    const [crop, setCrop] = useState<ReactCrop.Crop>({ unit: 'px', width: 200, height: 200, aspect: 1 / 1 })
    const [completedCrop, setCompletedCrop] = useState(null)

    const imgRef = useRef(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)

    const onLoad = useCallback((img) => {
        imgRef.current = img
    }, [])

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return
        }

        const image = imgRef.current
        const canvas = previewCanvasRef.current
        const crop = completedCrop

        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        const ctx = canvas.getContext('2d')
        const pixelRatio = window.devicePixelRatio

        canvas.width = crop.width * pixelRatio
        canvas.height = crop.height * pixelRatio

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx.imageSmoothingQuality = 'high'

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )
    }, [completedCrop])

    useEffect(() => {
        return () => {
            upImg && URL.revokeObjectURL(upImg)
        }
    }, [upImg])

    const uploadPhoto = async () => {
        if (!crop || !previewCanvasRef.current) {
            return
        }

        const {
            data: { signedRequestUrl, url },
        } = await axios.get('/api/image/sign')
        setIsUploading(true)

        const blob = await new Promise((resolve) => previewCanvasRef.current.toBlob(resolve))

        try {
            await axios.put(signedRequestUrl, new File([blob as Blob], 'avatar'))

            setIsUploading(false)
            props.updateAvatar({ avatar: url })
        } catch {
            setIsUploading(false)
            showError('Oops! Something went wrong during upload')
        }

        props.hideModal()
    }

    return (
        <Modal hide={props.hideModal}>
            <div className="flex justify-center">
                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    minHeight={100}
                    minWidth={100}
                />
                <canvas ref={previewCanvasRef} className="hidden" />
            </div>
            <div className="flex justify-center mt-4">
                <button className="mr-2 btn" onClick={uploadPhoto} disabled={isUploading}>
                    Save
                </button>
                <button className="ml-2 btn" onClick={props.hideModal} disabled={isUploading}>
                    Cancel
                </button>
            </div>
        </Modal>
    )
}
