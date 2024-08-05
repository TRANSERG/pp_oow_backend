const { CatchAsyncError } = require("../../error/CatchAsyncError");
const { Store } = require("../../models/Store");
const { response } = require("../../service/Response");
const { validateCreateStore } = require("../store.controller");


exports.getStoreDetails = CatchAsyncError(async(req,res) =>{
    try {
    const storeId = req.params.id;
    if(!storeId || storeId === undefined){
        return response(res,"please provide store id",{},406)
    }


    const data = await Store.findOne({userId : req.user.userId,_id : storeId})

    if(!data){
        response(res,'store not found!',{},401)
    }

    console.log(data)

    response(res,'successfully fetched store details!',data,201)

    } catch (error) {
        response(res,error.message,error,500)
    }
})




exports.updateStoreDetails = CatchAsyncError(async(req,res) => {
    
    console.log('work ' + req.body)
    try {
        const {name,store_mobile,store_email,address_line,address_line_optional,state,country,pincode} = validateCreateStore.parse(req.body)
        const storeId = req.params.id

        const updateStore = await Store.findByIdAndUpdate(
            {_id : storeId, userId : req.user.userId},
            {
                name,
                store_email,
                store_mobile,
                address_line,
                address_line_optional,
                state,
                country,
                pincode
            }, 
            { new: true }
        );

        if(!updateStore){
            return response(res,'store not found!',{},401)
        }

        return response(res,'store details updated successfully!',{},201)

    } catch (error) {
        if(error.name === "ZodError"){
            return response(res,'please provide required credentials!',error,406)
        }
        
        response(res,error.message,error,500)
    }
})