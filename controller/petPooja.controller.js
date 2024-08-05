
const { CatchAsyncError } = require("../error/CatchAsyncError");
const { response } = require("../service/Response");
const fs = require('fs');
const path = require('path');

exports.pushMenu = CatchAsyncError(async (req, res) => {
    try {
        const data = req.body.data;
        if (!data) {
            return response(res, 'Data is required', null, 400);
        }

        const timestamp = Date.now();
        const fileName = `${timestamp}.js`;
        const storagePath = path.join(__dirname, '../storage', fileName);

        console.log(storagePath)

        if (!fs.existsSync(path.dirname(storagePath))) {
            fs.mkdirSync(path.dirname(storagePath), { recursive: true });
        }

        fs.writeFileSync(storagePath, `module.exports = ${JSON.stringify(data, null, 2)};`);

        res.status(201).json({
            "success": "1",
            "message": "Menu items are successfully listed."
        })
    } catch (error) {
        return response(res, error.message, error, 500);
    }
});


exports.updateAddon = CatchAsyncError(async (req, res) => {
    try {
        const data = req.body.data;
        if (!data) {
            return response(res, 'Data is required', null, 400);
        }

        const timestamp = Date.now();
        const fileName = `${timestamp}.js`;
        const storagePath = path.join(__dirname, '../storage', fileName);

        console.log(storagePath)

        if (!fs.existsSync(path.dirname(storagePath))) {
            fs.mkdirSync(path.dirname(storagePath), { recursive: true });
        }

        fs.writeFileSync(storagePath, `module.exports = ${JSON.stringify(data, null, 2)};`);

        res.status(200).json({
            status: "success",
            message: "Stack status updated successfully!"
        })

    } catch (error) {
        return response(res, error.mesaage, error, 500)
    }
})

exports.updateAddon = CatchAsyncError(async (req, res) => {
    try {
        const data = req.body.data;
        if (!data) {
            return response(res, 'Data is required', null, 400);
        }

        const timestamp = Date.now();
        const fileName = `${timestamp}.js`;
        const storagePath = path.join(__dirname, '../storage', fileName);

        console.log(storagePath)

        if (!fs.existsSync(path.dirname(storagePath))) {
            fs.mkdirSync(path.dirname(storagePath), { recursive: true });
        }

        fs.writeFileSync(storagePath, `module.exports = ${JSON.stringify(data, null, 2)};`);

        res.status(200).json({
            status: "success",
            message: "Stack status updated successfully!"
        })

    } catch (error) {
        return response(res, error.mesaage, error, 500)
    }
})



exports.getStoreStatus = CatchAsyncError(async (req, res) => {
    try {
        const data = req.body.data;
        if (!data) {
            return response(res, 'Data is required', null, 400);
        }

        const timestamp = Date.now();
        const fileName = `${timestamp}.js`;
        const storagePath = path.join(__dirname, '../storage', fileName);

        console.log(storagePath)

        if (!fs.existsSync(path.dirname(storagePath))) {
            fs.mkdirSync(path.dirname(storagePath), { recursive: true });
        }

        fs.writeFileSync(storagePath, `module.exports = ${JSON.stringify(data, null, 2)};`);

        res.status(200).json({
            status: "success",
            store_status: 1,
            message: "Store Delivery Status fetched Successfully!"
        })

    } catch (error) {
        return response(res, error.mesaage, error, 500)
    }
})

exports.updateStoreStatus = CatchAsyncError(async (req, res) => {
    try {
        const data = req.body.data;
        if (!data) {
            return response(res, 'Data is required', null, 400);
        }

        const timestamp = Date.now();
        const fileName = `${timestamp}.js`;
        const storagePath = path.join(__dirname, '../storage', fileName);

        console.log(storagePath)

        if (!fs.existsSync(path.dirname(storagePath))) {
            fs.mkdirSync(path.dirname(storagePath), { recursive: true });
        }

        fs.writeFileSync(storagePath, `module.exports = ${JSON.stringify(data, null, 2)};`);

        res.status(200).json({
            "status": "success",
            "store_status": "1",
            "message": "Store Delivery Status fetched successfully"
        })
    } catch (error) {
        return response(res, error.message, error, 500)
    }
})