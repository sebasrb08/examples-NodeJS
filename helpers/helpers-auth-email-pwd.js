import { USERS } from "../bbdd.js";

const authByEmailPwd=(email,password)=>{
    if( USERS.find(users=>users.email===email)){
        const user = USERS.findIndex(users=>users.email===email) 
        const user2=USERS.find(users=>users.email===email)
        if(USERS[user].password===password){
           return user2
        }else{
            throw new Error()
        }
   }else{
        throw new Error()
}
}
export default authByEmailPwd