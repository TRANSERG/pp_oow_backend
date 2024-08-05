const { CatchAsyncError } = require("../error/CatchAsyncError");
const { Store } = require("../models/Store");
const { response } = require("../service/Response");
const z = require('zod')



const validateCreateStore = z.object({
    name : z.string(),
    store_mobile : z.string().length(10),
    store_email : z.string().email(),
    address_line : z.string(),
    address_line_optional : z.string().nullable().optional(),
    state : z.string(),
    country : z.string(),
    pincode : z.string().length(6)
})


exports.createStore = CatchAsyncError(async(req,res) => {
    try {
        const {name,store_mobile,store_email,address_line,address_line_optional,state,country,pincode} = validateCreateStore.parse(req.body)
        
    const validateStoreName = await Store.findOne({userId: req.user.userId,name })

    if(validateStoreName){
        return response(res,'store name already exists',{},401)
    }
    
    const newStore = await Store.create({
        name,
        address_line,
        address_line_optional,
        pincode,
        state,
        country,
        store_email,
        store_mobile,
        pincode,
        userId : req.user.userId
    })

    if(!newStore){
        return response(res,'server transaction failed, please try again later!', 500)
    }

    response(res,'store created successfully!',{data : newStore},201)

    } catch (error) {
        if(error.name === "ZodError"){
            return response(res,'please provide required credentials!',error,406)
        }
        
        response(res,error.message,error,500)
    }
})

exports.getUserStores = CatchAsyncError(async(req,res) => {
    try {
        const stores = await Store.aggregate([
            {
                $match: {
                  userId: req.user.userId
                }
              },
              {
                $project: {
                  name: "$name"
                }
              }
        ])

        response(res,'user stores',stores,201)

    } catch (error) {
        response(res,error.message,error,500)
    }
})

// exports.getUserStores = CatchAsyncError(async(req,res) => {
//     try {
//         const data = await 
//     } catch (error) {
//        response(res,error.message,error,500)
//     }
// })