import { generateToken } from "../services/token.service.js";
import bcrypt from "bcrypt";
import { getConnection } from "../services/redis.service.js";
import { sendOTP } from "../services/email.service.js";
import { connectionTournament } from "../services/mongo.service.js";
import { USUARIO_COLLECTION } from "../constants/usuario.const.js";

// Hasheamos la contraseña "1234" una sola vez al arrancar el servidor
// bcrypt.hash convierte "1234" en un hash seguro con 10 rondas de encriptación

const passwordHash = await bcrypt.hash("1234", 10);

export const  login = async (req,res) => {

    try{
        // Extraemos usuario y password del body de la petición
        const { username, password } = req.body;

        // Buscamos el usuario en MongoDB por nombre para obtener su correo
        const connection = await connectionTournament();
        const usuario = await connection.collection(USUARIO_COLLECTION).findOne({ nombre: username });
        //console.log("Usuario encontrado:", usuario);

        // Si no existe el usuario en MongoDB, rechazamos con 401
        if (!usuario) {
            return res.status(401).json({ success: false, msg: "Credenciales inválidas" });
        }

        // bcrypt.compare compara el password recibido contra el hash
        // nunca desencripta, solo verifica 
        const passwordValido = await bcrypt.compare(password, passwordHash);
        //console.log("Password valido:", passwordValido);

        if (!passwordValido) {
            return res.status(401).json({ success: false, msg: "Credenciales inválidas" });
        }

        // Generamos un número aleatorio de 6 dígitos como OTP
        //Math.random() genera un número decimal aleatorio entre 0 y 1, por ejemplo 0.4521.
        //Al multiplicarlo por 900000 obtienes un número entre 0 y 900000, por ejemplo 406890.
        //Al sumarle 100000 garantizas que el resultado siempre sea de 6 dígitos, entre 100000 y 999999.
        //Math.floor() elimina los decimales, dejando un número entero.
        //.toString() lo convierte a texto porque la OTP se guarda como string en Redis.
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Guardamos la OTP en Redis con clave "otp:nombreUsuario"
        // setEx guarda con TTL de 300 segundos (5 minutos), luego Redis la borra automáticamente
        const redis = await getConnection();
        await redis.setEx(`otp:${username}`, 300, JSON.stringify({ otp, expiraEn: 300 }));

        // Enviamos la OTP al correo del usuario que está registrado en MongoDB
        await sendOTP(usuario.correo, otp);

        // Respondemos confirmando que la OTP fue enviada, sin entregar el token aún
        return res.status(200).json({
            success: true,
            msg: "OTP enviada al correo"
        });

    }catch(e){
        
        return res.status(500).json({
            "success": false,
             "msg": "Error interno ",
             error: e.message
        })
    }
    
}

//Validacion de la OTP
export const verifyOtp = async (req, res) => {
    try {
        // Recibimos el usuario y la OTP ingresada por el usuario
        const { username, otp } = req.body;

        // Buscamos la OTP en Redis con la clave "otp:nombreUsuario"
        const redis = await getConnection();
        const data = await redis.get(`otp:${username}`);

        // Si no existe en Redis significa que expiró o nunca se generó
        if (!data) {
            return res.status(401).json({ success: false, msg: "OTP expirada o inválida" });
        }

        // Parseamos el JSON guardado en Redis
        const { otp: otpGuardada } = JSON.parse(data);

        // Comparamos la OTP recibida contra la guardada en Redis
        if (otp !== otpGuardada) {
            return res.status(401).json({ success: false, msg: "OTP incorrecta" });
        }

        // Eliminamos la OTP de Redis para que no pueda usarse de nuevo
        await redis.del(`otp:${username}`);

        // Buscamos los datos del usuario en MongoDB
        const connection = await connectionTournament();
        const usuario = await connection.collection(USUARIO_COLLECTION).findOne({ nombre: username });

        // Generamos el token JWT con los datos del usuario
        const token = generateToken({ username });

        return res.status(200).json({
            success: true,
            token,
            expiracion: "1h",
            usuario: {
                nombre: usuario.nombre,
                correo: usuario.correo,
                pais: usuario.pais
            }
        });

    } catch (e) {
        return res.status(500).json({ success: false, msg: "Error interno", error: e.message });
    }
};