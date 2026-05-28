import dotenv from 'dotenv'
dotenv.config()

export const ENVIRONMENT = {
    port : process.env.PORT || 3000,
    redisUrl: process.env.REDIS_DB_URL || '',
    mongoUrl: process.env.MONGO_DB_URL || '',
    emailUrl: process.env.PASSWORD_EMAIL || '',
    emailuser: process.env.USER_EMAIL || ''
}

export const getEnv = (name)=>{
    if (!ENVIRONMENT[name]) {
        console.log("Variables no existe")
        return'';   
    }
    return ENVIRONMENT[name];
}