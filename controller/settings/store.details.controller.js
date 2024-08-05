const { CatchAsyncError } = require("../../error/CatchAsyncError");
const { Store } = require("../../models/Store");
const { response } = require("../../service/Response");


exports.getStoreDetails = CatchAsyncError(async(req,res) =>{
    try {
    const storeId = req.params.id;

    const data = await Store.findOne({userId : req.user.userId,_id : storeId})

    if(!data){
        response(res,'store not found!',{},401)
    }
    } catch (error) {
        response(res,error.message,error,500)
    }
})