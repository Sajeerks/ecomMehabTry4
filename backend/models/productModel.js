const mongoose =require("mongoose")

const produtSchema = new  mongoose.Schema({
    name:{
        type:String,
        required:[true,"Plese enter the product name"],
        trim: true,
        unique: true ,
    },
    description:{
        type:String,
        required:[true,"Plese enter the product description"],
    },
    price:{
        type:Number,
        required:[true,"Plese enter the product price"],
        maxLength:[8,"price cannont exceed 8 characters"]
    },
    ratings :{
        type:Number,
        defaul:0
    },
    images:[
        {
            public_id :{
                type:String,
                required:true

            },
            url :{
                type:String,
                required:true

            },

        }
    ],
    category:{
        type:String,
        required:[true, "please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Plese enter the product price"],
        maxLength:[4,"price cannont exceed 8 characters"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId, 
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true
            },
            rating :{
                type:Number,
                defaul:0
            },
            comment:{
                type:String,
                required:true
            }
        
        }

        ],
        user:{
            type:mongoose.Schema.ObjectId, 
            ref:"User",
            required:true,
        },

    createdAt:{
        type:Date,
        default:Date.now
    }
    

})

module.exports = mongoose.model("Product" ,produtSchema )