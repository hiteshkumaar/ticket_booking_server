const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    bookedUsingMail:{
        type:String,
        required:true
    },
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
    numberofticketsbooked:{
        type:Number,
        required:true
    },
    time:{
        type:String,
        default:Date.now
    }
})
const BookingModel=mongoose.model("booking",bookingSchema)
module.exports=BookingModel