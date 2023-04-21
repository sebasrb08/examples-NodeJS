import { Router } from "express";
import authByEmailPwd from  "../helpers/helpers-auth-email-pwd.js";
import { SignJWT,jwtVerify } from "jose";
import { USERS } from "../bbdd.js";
import validateLoginDTO from "../dto/validate_login_dto.js";
const authTokenRouter = Router()

authTokenRouter.post("/login", validateLoginDTO, async (req,res)=>{
    const {email,password}=req.body
    
    if(!email || !password) return res.sendStatus(400)
    try{
       const {guid}= authByEmailPwd(email, password)
        
       const encoder=new TextEncoder()
       const jwtConstructor= new SignJWT({guid})
        const jwt= await jwtConstructor.setProtectedHeader({alg:"HS256",typ:"JWT"})
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

        return res.send({jwt})

    }catch(e){
       return res.sendStatus(401)
    }
})

authTokenRouter.get("/profile", async(req,res)=>{
    const {authorization}=req.headers
 
    if(!authorization) return res.sendStatus(401)

    try{
        const encoder=new TextEncoder()
        const {payload}=await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)

        )
        let user=USERS.find(user=>user.guid===payload.guid)

        if(!user) return res.sendStatus(401)
    
        delete user.password

        res.send(user)


    }catch(err){
        return res.sendStatus(401)

    }
    
})

export default authTokenRouter