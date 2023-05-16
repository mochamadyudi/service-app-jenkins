import {UploadMulter} from "../../../lib/modules/uploads/upload-multer";
import {ExtractZip} from "../../../lib/modules/extract-zip";

export default (app)=> {
    app.post('/template',UploadMulter.template,ExtractZip.middleware.MiddlewareFile, (req,res)=>{
        try{
            if(!req?.file) {
                res.status(400)
                return res.json({
                    error:true,
                    message: "file required!"
                })
            }
            return res.json({message:"OK"})
        }catch(err){

        }
    })
}