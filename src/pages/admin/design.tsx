import { GET as GetUser } from '@api/user'
import Layout from '@components/shared/Layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { useState } from 'react'

interface IDesignPageProps {}

const DesignPage: React.FC<IDesignPageProps> = (props) => {
    const [disabled, setDisabled] = useState(false)

    return (
        <Layout title="Design">
            <span role="button" className="text-right underline" onClick={() => setDisabled((prev) => !prev)}>
                Toggle state: {disabled ? 'Disabled' : 'Active'}
            </span>
            <div className="flex flex-col mb-10">
                <h1>Buttons</h1>
                <button disabled={disabled} className="mb-2 btn btn-primary">
                    Primary
                </button>
                <button disabled={disabled} className="mb-2 btn btn-secondary">
                    Secondary
                </button>
            </div>
            <div className="flex flex-col mb-10">
                <h1>Inputs</h1>
                <label htmlFor="text">Text</label>
                <input
                    disabled={disabled}
                    className="mb-2"
                    type="text"
                    id="text"
                    defaultValue="text input"
                    placeholder="text input"
                />
                <label htmlFor="password">Password</label>
                <input
                    disabled={disabled}
                    className="mb-2"
                    type="password"
                    id="password"
                    defaultValue="text input"
                    placeholder="password input"
                />
                <label htmlFor="email">Email</label>
                <input
                    disabled={disabled}
                    className="mb-2"
                    type="email"
                    id="email"
                    defaultValue="text input"
                    placeholder="email input"
                />
                <label htmlFor="textarea">Textarea</label>
                <textarea
                    disabled={disabled}
                    className="mb-2"
                    id="textarea"
                    defaultValue="text input"
                    placeholder="textarea input"
                />
                <label htmlFor="select">Select</label>
                <select
                    defaultValue="default"
                    disabled={disabled}
                    className="mb-2"
                    id="select"
                    placeholder="select input"
                >
                    <option value="default" disabled>
                        Select your option
                    </option>
                    <option>Durr</option>
                </select>
            </div>
            <div className="flex flex-col mb-10">
                <h1>Font</h1>
                <h1>This is an h1</h1>
                <h2>This is an h2</h2>
                <h3>This is an h3</h3>
                <p>This is a p</p>
                <label>This is a label</label>
            </div>
            <div className="flex flex-col mb-10">
                <h1>Utilities</h1>
                <div className="card">
                    <h2>A card</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate modi facere hic illo,
                        voluptates earum minima tenetur sint repellendus natus excepturi tempore cum quaerat, sit, omnis
                        illum eos quidem impedit.
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: { permanent: false, destination: '/login' },
        }
    }

    const user = JSON.parse(JSON.stringify(await GetUser(session.user.id)))

    if (user?.role !== 'ADMIN') {
        return {
            redirect: { permanent: false, destination: '/login' },
        }
    }

    return {
        props: {},
    }
}

export default DesignPage
