import foodModel from "../models/foodModle.js";
import fs from 'fs';
const addFood=async (req,res)=>
{
    let image_filename=`${req.file.filename}`;
    const food =new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
    })
    try{
        await food.save();
        res.json({success:true,message:"food added"})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}
//list to all food list
const listFood= async (req,res)=>
{
    try {
         const foods=await foodModel.find({});
         res.json({
            success:true,
            data:foods
         })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error
        })
    }
   
}
const removeFood =async (req,res)=>
{
    try {
        const food =await foodModel.findById(req.body.id);
        fs.unlink(`upload/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"foodremoved"})

    } catch (error) {
        console.log(error);
        res.json({success:true,message:"error"})
        
    }
}

export {addFood,listFood,removeFood}