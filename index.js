
// const http = createServer((req,res)=> {
//     console.log("Peticion recibida")
//     res.end('comunicado')
// })
// http.listen(3000)

// Create a local server to receive data from
// import {createServer} from "http"
import  createExpressServer  from "express";
import dotenv from "dotenv"
import accountRouter from "./routes/account.js";
import authSessionRouter from "./routes/auth_session.js";
import cookieParser from "cookie-parser";
import authTokenRouter from "./routes/auth_token.js";
import authRouter from "./routes/auth.js";
import mongoose from "mongoose";

dotenv.config()
const PORT =process.env.PORT ||3000
const expressApp=createExpressServer()

expressApp.use(cookieParser())

expressApp.use(createExpressServer.text())
expressApp.use(createExpressServer.json())
expressApp.use("/account",accountRouter)
expressApp.use("/auth-session",authSessionRouter)
expressApp.use("/auth-token", authTokenRouter)
expressApp.use("/auth", authRouter);


const bootstrap= async ()=>{
  await mongoose.connect(process.env.MONGODB_URL)

  expressApp.listen(PORT,()=>{
    console.log(`servidor levantado en el puerto ${PORT}`)
   })
  
}
bootstrap()


// expressApp.post('/cuenta/:idcuenta/:idcuenta2',(req,res)=>{
//   console.log(req.headers)
//   // console.log(req.params)
//   // console.log(req.query)
//   // console.log(req.body)
//   res.send('recibido')
// })





// const server = createServer((req, res) => {
//   // console.log(req.method)
//   // console.log(req.url)
//   // console.log(req.headers)
//   // console.log('holaaaaaaaa')
//   let data=''
//   let chunkIndex=0
//   req.on("data",(chunk)=>{
//     data+=chunk
//     chunkIndex++
//     console.log(chunk)
//     console.log(chunkIndex)
//   }) 
//   req.on("end",()=>{
//     res.end('recibido')
//   })
 
// });

// server.listen(2000);
