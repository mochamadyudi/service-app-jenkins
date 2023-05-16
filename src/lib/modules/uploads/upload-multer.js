import multer from 'multer'
import path from "path";
import {ConvertFilenameUpload, pathUploadedByDate, pathUploadTemplate, strFormat} from "@yid/helpers";

/**
 *
 * @param file
 * @param cb
 * @returns {*}
 */
export function checkFileType(file,cb){
    // allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // check mime
    const mimetype = filetypes.test(file.mimetype);

    if( mimetype && extname ){
        return cb(null,true);
    }else{
        cb('Error: Image Only!')
    }
}

/**
 * @param req
 * @param file
 * @param cb
 * @returns {*}
 * @constructor
 */
export function CheckFileZipType(req,file,cb){
    let maxSize = 100 * 1024 * 1024
    const fileSize = parseInt(req.headers['content-length'])

    // Allowed ext
    const filetypes = /zip/;

    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if(fileSize <= maxSize){
        if(mimetype && extname){
            return cb(null,true);
        } else{
            cb({
                status:500,
                code:"ERR_STORAGE",
                error:true,
                message: 'Error: Zip Only'
            })
        }
    }else{
        cb('Error: Size Max 100Mb')
    }
}

const storage = multer.diskStorage({
    destination: async (req,file,callback)=> {
        const { only_date } = pathUploadedByDate(file.originalname.toString().toLowerCase().replace(/ /g,'-'))
        callback(null,only_date)
    },
    filename: (req,file,callback)=> {
        const filename = ConvertFilenameUpload(file.originalname,'uploads')
        callback(null,filename);
    }
})

const storageTemplate = multer.diskStorage({
    destination: async (req,file,callback)=> {
        const { destination, path,dir} = pathUploadTemplate(strFormat(file.originalname))
        callback( null, dir)
    },
    filename: (req,file,callback)=> {
        const filename = strFormat(file.originalname)
        callback(null,filename);
    }
})

const uploadFiles = multer({
    storage: storage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
}).array(
    'files',
    10
);

const uploadTemplate = multer({
    storage: storageTemplate,
    fileFilter:CheckFileZipType
}).single('template');


/**
 * @type {{storageTemplate: DiskStorage, uploadFiles, checkFileType: ((function(*, *): (*|undefined))|*), storage: DiskStorage, CheckFileZipType: ((function(*, *, *): (*|undefined))|*)}}
 */
const UploadMulter = {
    checkFileType,
    CheckFileZipType,
    storage,
    storageTemplate,
    files:uploadFiles,
    template:uploadTemplate
}


export {
 UploadMulter
}