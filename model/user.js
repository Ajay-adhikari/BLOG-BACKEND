import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    name:{
        type:String , 
        required:true
    },
    username:{

        type:String,
        required:false,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const Upbhokta =mongoose.model('Upbhokta' , userSchema);
export default Upbhokta;