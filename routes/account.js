import  Express  from "express";
import userModel from "../schemas/users-schemas.js";

const accountRouter = Express.Router()

accountRouter.use((req,res,next)=>{
    console.log(req.ip)
    next()
})


accountRouter.get('/:guid', async (req,res)=>{
  const {guid} = req.params

  const usuarios= await userModel.findById(guid).exec()

  if(!usuarios)res.status(404).send()
    
    res.send(usuarios)
  })
  
accountRouter.post('/', async (req,res)=>{
    const { guid, name } = req.body;
  
    if (!guid || !name) return res.state(400).send();

    const usuarios= await userModel.findById(guid).exec()

    // if (usuarios) return res.status(409).send("el usuario ya se encuentra registrado");
    const newUsuarios= new userModel({_id:guid,name})

    newUsuarios.save()

    return res.send("usuario registrado");
  })
  
accountRouter.patch('/:guid', async(req,res)=>{
    const { guid } = req.params;
    const { name2 } = req.body;
  
    if (!name2) return res.status(400).send();
    
    const usuarios= await userModel.findById(guid).exec()
  
    if (!usuarios) res.status(404).send();
  
    usuarios.name = name2;
  
    await usuarios.save()
    return res.send();
    
  })
  
accountRouter.delete('/:guid',async(req,res)=>{
    const { guid } = req.params;

    const usuarios= await userModel.findById(guid).exec()
  
    if (!usuarios) return res.status(404).send();
  
    
     await usuarios.deleteOne({_id:req.params})

    return res.send();
  })

export default accountRouter
