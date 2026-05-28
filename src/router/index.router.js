import { Router } from 'express';
import mongo from './mongo.router.js';
import UsuarioRouter from './usuario.router.js';
import EventoRouter from "./evento.router.js";
import ApuestaRouter from "./apuesta.router.js";
import AuthRouter from "./auth.router.js";
//import { sendMail } from '../services/email.service.js';
//import { db } from "../services/firebase-services.js"

const router = Router();
// router.use(ApuestaRoute);
// router.use(mongo);
router.use( "/api/usuario", UsuarioRouter);
router.use("/api/evento", EventoRouter)
router.use("/api/apuesta", ApuestaRouter)
router.use("/auth",AuthRouter);

router.use("/email", async (requestAnimationFrame,res)=>{
    const salida =await sendMail('123456')
    res.status(200).json({
        msn: 'enviado',
        salida
    })
});

router.use("/firebase-insert", async (req, res)=>{
    try {
        // const docRef = await db.collection("user").add(
        //     {
        //         nombre: "Nombre de la prueba",
        //         apellido: "Apellido de la prueba"
        //     }
        // )
        res.send({data:docRef, success:true})
    } catch (e) {
        console.log(e);
        res.send("Error X()")
    }
})

export default router;
