import { Router } from "express";
import express from "express";
import apuestaController from "../controller/apuesta.controller.js";

const router = Router();

router.use(express.json());

router.get("/get", apuestaController.getApuesta);
router.get("/get/usuario/:usuarioId", apuestaController.getApuestaPorUsuario);
router.post("/post", apuestaController.postApuesta);
router.put("/update/:id/estado", apuestaController.actualizarEstadoApuesta);




/* consulta en curso solo deporte y posible ganancia*/

router.get("/en-curso", apuestaController.getEnCurso)
router.get("/por-deporte/:nombre", apuestaController.porDeporte)

export default router;
