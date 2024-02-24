const { mongoose } = require("mongoose");

const newsSchema = mongoose.Schema({
    image:{
        type : String,
        require : true
    },
    description:{
        type : String,
        require : true
    }
},{
    versionKey: false
})

const newsModel= mongoose.model("new", newsSchema)

module.exports={
    newsModel
}