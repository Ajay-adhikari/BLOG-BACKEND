
import mongoose  from "mongoose";


const Connection=async (DB)=>{
   
    const URL=DB;
    try{
        await mongoose.connect(URL , { useUnifiedTopology:true,
            useNewUrlParser:true});
        console.log("database connected successfully");
    }
    catch(error){
console.log("error while connecting with database")
console.log(error);
    }
}
export default Connection;