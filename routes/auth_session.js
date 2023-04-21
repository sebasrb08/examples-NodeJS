import { Router } from "express";
import authByEmailPwd from  "../helpers/helpers-auth-email-pwd.js";
import { nanoid } from 'nanoid'
import { USERS } from "../bbdd.js";


const authSessionRouter=Router()
let session=[]
authSessionRouter.post("/login",(req,res)=>{
    const {email,password}=req.body
    if(!email || !password) return res.sendStatus(400)
    try{
       const {guid} = authByEmailPwd(email, password)

        const sessionId=nanoid()
        session.push({sessionId,guid})
        res.cookie("sessionId",sessionId,{
            httpOnly:true
        })

        return res.send()

    }catch(err){
       return res.sendStatus(403)
    }
})

authSessionRouter.get("/profile",(req,res)=>{
    const {cookies}=req

    if(!cookies.sessionId) return res.sendStatus(401)

    const userSession=session.find(sessions=>sessions.sessionId===cookies.sessionId)

    if(!userSession) return res.sendStatus(401)

    let user=USERS.find(user=>user.guid===userSession.guid)

    if(!user) return res.sendStatus(401)

    delete user.password
    
    return res.send(user)
})


export default authSessionRouter