import {YidException} from "@yid/handlers";
import {PermissionService} from "../services/permission.service";
import {CategoryService} from "../services/category.service";

export class PermissionController{


    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    static async show(req,res){
        try{
            const [ err , data ] = await new PermissionService({
                key: req.query?.orderBy ?? "id",
                value: req.params.id
            }).detail()
            if(err){
                return YidException.BadReq(res,err)
            }
            if(!data){
                return YidException._NotFound(res,{
                    message:"Error: data notfound"
                })
            }
            return YidException.Success(res,{
                message:"Successfully! data found",
                data
            })
        }catch(err){
            return YidException.ExceptionsError(res,err)
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    static async create(req,res){
        try{
            const [ err , data ] = await new PermissionService({
                fields:req.body
            }).create()
            if(err){
                return YidException.BadReq(res,err)
            }
            if(!data){
                return YidException._NotFound(res,{
                    message:"Error: data notfound"
                })
            }
            return YidException.Success(res,{
                message:"Successfully! Created",
                data
            })
        }catch(err){
            return YidException.ExceptionsError(res,err)
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    static async update(req,res){
        try{
            const [ err, data ] = await new PermissionService({
                key: req.query?.orderBy ?? "id",
                value: req.params.id,
                fields:req.body
            }).update()

            if(err){
                return YidException.BadReq(res,err)
            }
            if(!data){
                throw YidException.notFound(new Error("Error: Data not found"))
            }
            return YidException.Success(res,{
                message:"Successfully!",
                data,
            })

        }catch(err){
            return YidException.ExceptionsError(res,err)
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    static async list(req,res){
        try{

            const [ err , data] = await new PermissionService({
                query:req.query,
            }).listData()

            if(err){
                return YidException.BadReq(res,err)
            }
            return YidException.SuccessGetList(res,{
                message:"Successfully get list!",
                data,
            })
        }catch (err){
            return YidException.ExceptionsError(res,err)
        }
    }
    static async delete(){
        try{

        }catch(err){
            return YidException.ExceptionsError(res,err)
        }
    }
}