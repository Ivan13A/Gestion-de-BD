import { connectionTournament } from "../services/mongo.service.js"
export const schemaMongo = async()=>{
    const db = await connectionTournament();

    await db.createCollection("persona", {
        validator : {
            $jsonSchema : {
                bsonType : "object",
                required : ["documento", "nombre"],
                properties : {
                    nombre : {
                        bsonType : 'string',
                        description: 'El nombre debe de ser un string'
                    },
                    docuemnto : {
                        bsonType : 'string',
                        description: 'El documento debe de ser un string'
                    },
                    correo : {
                        bsonType: 'string',
                        pattern : '^.+@.+$',
                        description: 'Debe ser un correo válido'
                    },
                    edad: {
                        bsonType: 'int',
                        minimum: 18,
                        maximum: 100,
                        description : 'La edad debe ser válida Rango (18-100)'
                    },
                    activo:{
                        bsonType: 'bool',
                        description: 'Debe ser un valor de True o false'
                    }

                    
                }
            }
        }
    })
    console.log("collection create successfull");
}