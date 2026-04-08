import usuariomodel from "../models/usuariomodel.js"

export const getUsuario = async(req,res) => {

    const data = await usuariomodel.getUsuarioModel();
    return res.status(200).json({"msn":"Hello getUser",data})
}

export const postUsuario = async(req,res) => {
    const json = req.body;
    const result = await usuariomodel.postUsuarioModelUnico(json);
    res.send({data: json})
}

export const postUsuarioMultiple = async(req,res) => {
    const json = req.body;
    const result = await usuariomodel.postUsuarioModelMultiple(json);
    res.send({data: json})
}

export const deleteUsuario = (req,res) => {
    
}

export const putUsuario = (req,res) => {
    
}


export const updateSaldo = (req, res)=>{
    const { id } = req.params;
    const { aumento }= req.body;
    const result = usuariomodel.updateSaldo(id,aumento);


    res.json({
        data: result
    });
}
export default {
    getUsuario,
    postUsuario,
    postUsuarioMultiple,
    putUsuario,
    deleteUsuario,
    updateSaldo
}