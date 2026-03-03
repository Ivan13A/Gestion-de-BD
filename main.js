import express from "express"   ;
import { createClient, REDIS_FLUSH_MODES } from "redis";
const app = express();

const redis = createClient({ url : 'redis://localhost:6379' });
redis.connect();


app.get("/save", async(req, res)=> {
    const json = {
        "nombre": "Ivan",
        "apellido": "Amaya"
    }
    await redis.set(
        'info:03578',
        JSON.stringify(json),
        {
            EX: 300
        }

    )

    res.send("Hola mundo cruel");
})

app.get("/get", async (req, res)=> {
    const data = await redis.get('info:03578');
    console.log(data);
    const json = JSON.parse(data);
    console.log(json)
    res.send(data)

})

app.get("/update", async(req, res) =>{
    const edad = 20;
    const data= await redis.get('info:03578');
    if(!data){
        return res.json({'success':false, 'data':[], 'msg': 'Not found'}, 404)
    }
    let json= JSON.parse(data);
    json.edad=edad;
    const response=await redis.set('info:03578', JSON.stringify(json),{
        EX: 300
    });
    const r =await redis.get('info:03578');
    res.json({"succes": response === 'OK', data:[], msg: response}, 200)
      
});

app.get('/hset',async (rep, res) =>{
    const response =await redis.hSet('info:192157', {
        'name': 'Anto',
        'lastname': 'Bermudez',
        'age': 20
    });
    await redis.expire('info:192157',300)
    res.send(response)
})

app.get('/getHash', async (rep, res) => {
    const response = await redis.hGetAll('info:192157');
    const ttl = await redis.ttl('info:192157')
    res.json({success: true, data: response, ttl})
})

app.get("/delete",async (req, res) => {
    //const data = await redis.del('info:192157')
    const data = await redis.hDel('info:192157', 'age')
    const data2 = await redis.hSet('info:192157', 'company', 'UFPSO')
        const response = await redis.hGetAll('info:192157')
    res.send(response)
})

app.listen(8000, ()=> {
    console.log("Hello world");
})