const { mongoose } = require("mongoose");

const carSchema = mongoose.Schema({
    image:{
        type : String,
        require : true
    }
},{
    versionKey: false
})

const carsModel= mongoose.model("car", carSchema)

module.exports={
    carsModel
}