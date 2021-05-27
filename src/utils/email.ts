import * as sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendVerificationRequest = async (email: string, url: string) => {
    const msg = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: process.env.NEXT_PUBLIC_SITE_NAME,
        html: `Magic Link for ${email}: <a href="${url}">Click here to login.</a>`,
    }
    sgMail.send(msg)
}
