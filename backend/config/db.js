import mongoose from "mongoose";
export const connectDB = async ()=>
{
    await mongoose.connect("mongodb+srv://immidisettichatushva:chatu123@new.lc0iqiy.mongodb.net/?retryWrites=true&w=majority&appName=new")
    .then(
        ()=>
            {
                console.log("db connected")
             })
        .catch(()=>
        {
            console.log("error occured")
        })
   
}