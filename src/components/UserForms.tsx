import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/client'
import { useForm } from 'react-hook-form'

interface ILoginFormProps {}

export const LoginForm: React.FC<ILoginFormProps> = () => {
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = async (loginData: { email: string }) => {
        await signIn('email', { ...loginData, callbackUrl: '/' })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-4">Login</h2>
            <label htmlFor="email" className="flex flex-col font-semibold">
                Enter your email address to sign in or create an account
            </label>
            <input
                type="text"
                className="w-full"
                id="email"
                name="email"
                placeholder="alexmcc.dev@gmail.com"
                ref={register({ required: true })}
            />
            {errors.email && <p className="text-error">Email is required</p>}
            <div className="flex mt-4">
                <button className="btn" type="submit">
                    Login
                </button>
            </div>
        </form>
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
            <div className="border rounded">
                <div className="p-4 border-b flex flex-col">
                    <h2>Your Name</h2>
                    <p className="mb-4">Please enter your full name, or a display name you are comfortable with.</p>
                    <input
                        type="text"
                        className="max-w-xs"
                        name="name"
                        maxLength={props.maxLength}
                        ref={register({ maxLength: props.maxLength })}
                    />
                </div>
                <div className="py-2 px-4 flex justify-between bg-gray-50">
                    <p className="self-center">Please use 32 characters at maximum.</p>
                    <button className="btn self-center" disabled={!isDirty}>
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}
