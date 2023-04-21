import { Type } from "@sinclair/typebox"
import Ajv from "ajv"
import addFormats from "ajv-formats"
import addErrors from "ajv-errors"

const loginDTOSchema=Type.Object(
    {
        email:Type.String({
            format:"email",
            errorMessage:{
                type:"el tipo de email debe ser un string",
                format:"el email debe ser valido"
            }
        }),
        password:Type.String({
            errorMessage:{
                type:"el tipo de password debe ser un string"
            }
        })
    },
    {
        additionalProperties:false,
        errorMessage:{
        additionalProperties:"el formato del objeto no es valido",
            
        }

    }
)

const ajv= new Ajv({allErrors:true})
addFormats(ajv,["email"]).addKeyword('kind').addKeyword('modifier')
addErrors(ajv)

const validate=ajv.compile(loginDTOSchema)

const validateLoginDTO=(req,res,next)=>{
    const isDTOValid=validate(req.body)

    if(!isDTOValid)return res.status(400).send(ajv.errorsText( validate.errors,{separator:"\n"}))

    next()
}



export default validateLoginDTO