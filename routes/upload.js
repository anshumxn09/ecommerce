const router = require('express').Router();
const cloudinary = require('cloudinary');
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');
const fs = require('fs');
// all the product image will be upload on the cloudinary...
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    secret_key : process.env.CLOUD_API_SECRET,
})

router.post('/uploads', auth, adminAuth, (req, res) => {
    try {
        // console.log(req.files);
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json('no files get uploaded');
        }
        // console.log(req.files.file);
        const file = req.files.file;

        // if the uploaded file size is more than 1mb then...
        // console.log(file.size);
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).json({
                message : "file size is more than 1mb"
            })
        }
        // console.log(file.mimetype);
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath);
            return res.status(400).json({
                message : "file is not lies under supporting types."
            })
        }

        console.log(file.tempFilePath);
        cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder : "test", api_secret: process.env.CLOUD_API_SECRET
        }, async (err, result) => {
            if(err) throw err;
            removeTmp(file.tempFilePath);
            res.status(200).json({
                public_id : result.public_id,
                url : result.secure_url,
            })
        })

    } catch (error) {
        return res.status(500).json({
            message : error,
        })
    }
})

router.post('/destroy', auth, adminAuth, (req, res) => {
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({
            message : "No images selected!",
        })

        cloudinary.v2.uploader.destroy(public_id,{api_secret: process.env.CLOUD_API_SECRET},async(err, result) => {
            if(err) throw err;

            res.json({
                message : "Deleted Images"
            })
        })
    } catch (error) {
        return res.status(500).json({
            message:error
        })
    }
})
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}
module.exports = router;