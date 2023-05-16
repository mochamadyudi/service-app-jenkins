// import AdmZip from 'adm-zip';
import decompress from 'decompress';
import {deleteFile} from "@yid/helpers";
function MiddlewareFile(req,res,next){
    let pathFile = null
    if(!req.file){
        next(new Error('File not found'))
    }
    if(req.file){
        pathFile = req.file.path ?? null
    }
    if(!pathFile){
        next(new Error('path file must be defined'))
    }

    try{
        (async function(){
            /**
             * compress file zip
             */
            await decompress(pathFile,req.file?.destination)
            /**
             * delete file uploaded
             */
            await deleteFile(pathFile)
        })()
        next()
    }catch (err){
        next(err)
    }

}
const ExtractZip = {
    middleware: {
        MiddlewareFile
    }
}
export  { ExtractZip }