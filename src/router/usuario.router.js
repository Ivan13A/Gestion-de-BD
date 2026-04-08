import {Router} from "express"
import express from "express"
import usuarioController from "../controller/usuario.controller.js"

const router = Router()

router.use(express.json())
router.get("/get",usuarioController.getUsuario)
router.post("/post",usuarioController.postUsuario)
router.post("/postMultiple", usuarioController.postUsuarioMultiple)
router.delete("/",usuarioController.deleteUsuario)
router.put("/", usuarioController.putUsuario)
router.put("/updateSaldo/:id", usuarioController.updateSaldo)

export default router;



