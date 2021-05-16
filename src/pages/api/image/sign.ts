import AWS from 'aws-sdk'
import cuid from 'cuid'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region,
    accessKeyId,
    secretAccessKey,
})

const params = {
    Bucket: bucketName,
    Key: cuid() + '.png',
    Expires: 30, // expiry time
    ContentType: 'image/*', // this can be changed as per the file type
    ACL: 'public-read',
}

const GET = async () => {
    const signedRequestUrl = await s3.getSignedUrlPromise('putObject', params)
    return {
        signedRequestUrl,
        url: `https://${bucketName}.s3.amazonaws.com/${params.Key}`,
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!session) {
        res.status(401).end()
    }

    switch (req.method) {
        case 'GET':
            return res.json(await GET())

        default:
            res.status(405).end()
            break
    }
}
