import eventoModel from "../models/evento.model.js";

export const getEvento = async(req,res) => {

    const data = await eventoModel.getEventoModel()
  return res.status(200).json({"msn":"Hello getUser",data})
}

export const postEvento = async(req,res) => {
    const json = req.body;
    const result = await eventoModel.postEventoModelUnico(json)
    res.send({data: json})
}

export const postEventoMultiple = async(req,res) => {
    const json = req.body;
    const result = await eventoModel.postEventoModelMultiple(json)
    res.send({data: json})
}
export const deleteEvento = async (req,res) => {
    try {
        const { id }= req.params
        const result = await eventoModel.deleteEvento(id);
        return res.send(result)

    } catch (e) {
        return res.send({msn: "No se pudo eliminar"})
    }
}
export default{
    getEvento,
    postEvento,
    postEventoMultiple,
    deleteEvento
}