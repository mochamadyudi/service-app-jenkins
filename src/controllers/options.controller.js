import {YidException} from "@yid/handlers";
import {OptionsService} from "../services";

export class OptionsController{


    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    static async show(req,res){
        try{
            const [ err , data ] = await new OptionsService({
                key: req.query?.orderBy ?? "id",
                value: req.params.id
            }).show()
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
            const [ err , data ] = await new OptionsService({
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
            const [ err, data ] = await new OptionsService({
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

            const [ err , data] = await new OptionsService({
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

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    static async delete(req,res){
        try{
            const [ err , data] = await new OptionsService({
                key: req.query?.orderBy ?? "id",
                value: req.params.id
            }).delete()

            if(err){
                return YidException.BadReq(res,err)
            }
            if(!data){
                return YidException._NotFound(res,{
                    message:"Error: data notfound"
                })
            }
            return YidException.Success(res,{
                message:"Successfully! deleted",
                data,
            })
        }catch(err){
            return YidException.ExceptionsError(res,err)
        }
    }
}