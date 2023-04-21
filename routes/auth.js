import {Router} from "express"
import { USERS } from "../bbdd.js";
import authByEmailPwd from "../helpers/helpers-auth-email-pwd.js";
const authRouter=Router()

// Endpoint publico(no autorizado)
authRouter.get('/publico',(req,res)=>{
    res.send('publico')
})

// Endpoint autenticado
authRouter.post('/autenticado',(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
        return res.sendStatus(400)
    }
    try{
        const user =authByEmailPwd(email,password)

        return res.send(`Usuario ${USERS[user].name} Autenticado `)

    }catch (err){
        return res.sendStatus(401)
    }
   

})

// Endpoint autorizado
authRouter.post('/autorizado',(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
        return res.sendStatus(400)
    }
    try{
     const user = authByEmailPwd(email,password)
        
        if(USERS[user].role==='admin'){
            return res.send(`Usuario ${USERS[user].name} esta Autorizado`)
        }else{
            return res.sendStatus(403)
        }
    }catch(err){
        return res.sendStatus(401)
    }

})
export default authRouter