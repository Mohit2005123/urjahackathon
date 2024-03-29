const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const electricitySchema= new Schema({
    name:{
        type:String,
        required: true,
    },
    January:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    },
    February:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    },
    March:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    },
    April:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    },
    May:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    },
    June:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    },
    July:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    },
    August:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    },
    September:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    },
    October:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    }
    ,November:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    }
    ,December:{
        type:Number,
        default:0,
        set: (v)=>{
            v===""? 0: v
        }
    },
    Location:String,
    City:String
});
const electricitydata= mongoose.model('electricitydata', electricitySchema);
module.exports= electricitydata;
