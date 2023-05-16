import {YidException} from "@yid/handlers";
import {Service} from "@yid/services";
import {Database} from "../lib/database";
import {RoleService} from "../services/role.service";
import {Op} from "sequelize";

export class RoleController {

    static async create(req,res){
        try{
            const [ err, data ] = await new RoleService({
                schema:Database.role,
                fields: req.body
            }).create()
            if(err){
                return YidException.BadReq(res,err)
            }
            return YidException.SuccessCreate(res,{
                message:"OK",
                data
            })
        }catch (err){
            return YidException.ExceptionsError(res,err)
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    static async update(req,res){
        try{
            const [ err, data ] = await new RoleService({
                key: req.query?.orderBy ?? "id",
                value: req.params.id,
                fields: req.body
            }).update()
            if(err){
                return YidException.BadReq(res,err)
            }
            return YidException.Success(res,{
                message:"Successfully! updated data",
                data
            })
        }catch (err){
            return YidException.ExceptionsError(res,err)
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    static async delete(req,res){
        try{
            const [ err , data ] = await new RoleService({
                key: req.query?.orderBy ?? "id",
                value: req.params.id,
            }).softDelete()
            if(err){
                return YidException.BadReq(res,err)
            }
            if(!data) {
                return YidException._NotFound(res, {
                    message: "Error: data notfound"
                })
            }
            return YidException.Success(res,{
                message:"Successfully! delete data",
                data
            })
        }catch(err){
            return YidException.ExceptionsError(res,err)
        }
    }


    static async rollback(req,res){
        try{
            const [ err , data ] = await new RoleService({
                key: req.query?.orderBy ?? "id",
                value: req.params.id,
                fields: {
                    deletedAt: null
                }
            }).update()
            if(err){
                return YidException.BadReq(res,err)
            }
            if(!data) {
                return YidException._NotFound(res, {
                    message: "Error: data notfound"
                })
            }
            return YidException.Success(res,{
                message:"Successfully! Rollback data",
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
     * @returns {Promise<*[]>}
     */
    static async show(req,res){
        try{
            const [ err , data ] = await new RoleService({
                key: req.query?.orderBy ?? "id",
                value: req.params.id,
                condition: {
                    where: {
                        deletedAt: {
                            [Op.is]: null
                        }
                    }
                }
            }).detail()
            if(err){
                return YidException.BadReq(res,err)
            }
            if(!data){
                return YidException._NotFound(res,{message:"Error: Role not found"})
            }
            return YidException.Success(res,{data})
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
    static async list(req,res){
        try{
            const [ err , data ] = await new RoleService({
                query: req.query
            }).listData()
            if(err){
                return YidException.BadReq(res,err)
            }
            return YidException.SuccessGetList(res,{
                message:"Successfully Created!",
                data,
            })
        }catch(err){
            return YidException.ExceptionsError(res,err)
        }
    }
}