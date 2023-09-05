const mongoose=require('mongoose')

const movieSchema=new mongoose.Schema({
    movieName:{
        type:String,
        required:true

    },
    theatreName:{
        type:String,
        required:true
    },
    theatreLocation:{
        type:String,
        requried:true
    },
    releaseDate:{
        type:Date,
        required:true,
        default:Date.now
    }
})
const MovieModel=mongoose.model("movies",movieSchema)
module.exports=MovieModel