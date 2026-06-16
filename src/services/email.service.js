import nodemailer from "nodemailer"
import { getEnv } from "../config/default.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${getEnv('emailuser')}`,
        //contraseña de aplicacion:rlxf occw wclo cchl
        pass: `${getEnv('emailUrl')}`
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendOTP = async (correo, otp)=>{
    return await transporter.sendMail({
        from: `Apuestas App <${getEnv('emailuser')}>`,
        to: correo,
        subject: 'Otp de inicio de seseion Apuestas Mongo',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Verificación de identidad</h2>
        <p>Hola, recibiste este correo porque iniciaste sesión en <strong>Casa de Apuestas</strong>.</p>
        <p>Tu código OTP es:</p>
        <div style="background: #f4f4f4; border-radius: 8px; padding: 15px; text-align: center; 
        font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333;">
            ${otp}
        </div>
        <p style="color: #888; font-size: 13px; margin-top: 15px;">Este código es válido por <strong>5 minutos</strong>. Si no fuiste tú, ignora este correo.</p>
    </div>`
        
    })
}