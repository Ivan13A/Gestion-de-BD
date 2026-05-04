import nodemailer from "nodemailer"
import { getEnv } from "../config/default.js";
const transporter = nodemailer.createTransport({
    service: 'email',
    auth: {
        user: 'iaamayab@ufpso.edu.co',
        //contraseña de aplicacion:rlxf occw wclo cchl
        pass: `${getEnv('email.Url')}`
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendMail = async (otp)=>{
    return await transporter.sendMail({
        from: "Apuestas Mongo '<iaamayab@ufpso.edu.co",
        to: 'amayabermudezivanantonio@gmail.com',
        subject: 'Otp de inicio de seseion Apuestas Mongo',
        html: `
        <div>
            <h1>Ejemplo "Apuestas mongo</h1>
            <p>Por favor para iniciar seseion dijite el codigo OTP generadoso</p>
            <div style ='color:white; margin:0 auto; text-aling; center; with: 14em; background:#555555, padding: 0.5em; border-radius: 5px'>
                ${otp}
            </div>
        <div>´
        `
    })
}