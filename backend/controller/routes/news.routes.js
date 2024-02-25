const express=require("express");
const {newsModel}=require("../../models/news.model")

const newsRouter=express.Router();

newsRouter.get("/",async(req,res)=>{
    try{
        const card=await newsModel.find();
        res.status(200).json(card)
    }
    catch(err){
        res.status(400).json({err:err})
    }
    
})
newsRouter.post("/addnews",async(req,res)=>{
    const {Image,description}=req.body;
    try{
        const card=await newsModel.findOne(description);
        if(card){
            res.status(400).json({err:err})
        }
        else{
            const newnews=await newsModel(req.body)
            await newnews.save()
            res.status(200).json(card)
        }
       
    }
    catch(err){
        res.status(400).json({err:err})
    }
    
})

module.exports={
    newsRouter
}
