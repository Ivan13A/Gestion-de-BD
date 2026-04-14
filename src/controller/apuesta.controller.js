import { response } from "express";
import apuestaModel from "../models/apuesta.model.js";
import { ObjectId } from "mongodb";

export const getApuesta = async (req, res) => {
    try {
        const data = await apuestaModel.getApuestaModel();
        return res.status(200).json({ "msn": "Apuestas:", data });
    } catch (error) {
        return res.status(500).json({ "msn": "Error al obtener apuestas", error: error.message });
    }
}

export const getApuestaPorUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const data = await apuestaModel.getApuestaPorUsuarioModel(usuarioId);
        return res.status(200).json({ "msn": `Apuestas del usuario ${usuarioId}`, data });
    } catch (error) {
        return res.status(500).json({ "msn": "Error al obtener apuestas del usuario", error: error.message });
    }
}

export const postApuesta = async (req, res) => {
    try {
        const apuestaData = req.body;
        
        //Validaciones 
        // if (!apuestaData.monto_apostado || apuestaData.monto_apostado <= 0) {
        //     return res.status(400).json({ "msn": "El monto apostado debe ser mayor a 0" });
        // }
        
        // if (!apuestaData.usuario_id) {
        //     return res.status(400).json({ "msn": "El ID del usuario es requerido" });
        // }
        
        // if (!apuestaData.evento_id) {
        //     return res.status(400).json({ "msn": "El ID del evento es requerido" });
        // }
        
        // if (!apuestaData.cuota_seleccionada || apuestaData.cuota_seleccionada <= 0) {
        //     return res.status(400).json({ "msn": "La cuota seleccionada debe ser mayor a 0" });
        // }
        
        const result = await apuestaModel.postApuestaModel(apuestaData);
        return res.status(201).json({ 
            "msn": "Apuesta registrada exitosamente", 
            data: apuestaData
            
        });
    } catch (error) {
        return res.status(500).json({ "msn": "Error al registrar apuesta", error: error.message });
    }
}

export const actualizarEstadoApuesta = async (req, res) => {
   const { id } = req.params;
   const body = req.body;
   const respuesta = await apuestaModel.actualizarEstadoApuestaModel(id, body["estado"])

   response.json({
    "enviado" : id,
    "cuerpo" : body,
    data : respuesta
   })
}

export const getEnCurso = async (req, res) =>{
    try {
        const result = await apuestaModel.getEnCurso();
        res.json_({data : result})
    } catch (e) {
        console.log(e)
        res.status(500).json({"msn":"error interno"})
    }
}

export const porDeporte = async (req,res) =>{
    const { nombre } =req.params;
    const response = await apuestaModel.porDeporte(nombre);
    return res.send({response})
}
export default {
    getApuesta,
    getApuestaPorUsuario,
    postApuesta,
    actualizarEstadoApuesta,
    getEnCurso,
    porDeporte
};