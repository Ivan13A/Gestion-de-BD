import {Router} from "express"
import express from "express"
import eventoController from "../controller/evento.controller.js"
const router = Router()

router.use(express.json())
router.get("/get",eventoController.getEvento)
router.post("/post",eventoController.postEvento)
router.post("/postMultiple", eventoController.postEventoMultiple)
router.post("deleteEvento/:id", eventoController.deleteEvento)

export default router;