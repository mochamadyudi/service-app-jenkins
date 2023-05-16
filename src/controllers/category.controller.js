import {YidException} from "@yid/handlers";
import {CategoryService} from "../services/category.service";

export default class CategoryController {
    static async create(req,res){
        try{

            const [ err,data]  = await new CategoryService({
                fields: req.body
            }).create()
            console.log({err})
            if(err){
                return YidException.BadReq(res,err)
            }

            return YidException.SuccessCreate(res,{
                message:"Successfully Created!",
                data: data
            })
        }catch (err){
            return YidException.ExceptionsError(res,err)
        }
    }
    static async list(req,res){
        try{

            const [ err , data] = await new CategoryService({
                query:req.query,
            }).listData()

            if(err){
                return YidException.BadReq(res,err)
            }
            return YidException.SuccessGetList(res,{
                message:"Successfully Created!",
                data,
            })
        }catch (err){
            return YidException.ExceptionsError(res,err)
        }
    }
    static async detail(req,res){
        try{
            const [ err , data] = await new CategoryService({
                query:req.query,
                key: req.query?.orderBy ?? "id",
                value:req.params.id
            }).detail()
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
        }catch (err){
            return YidException.ExceptionsError(res,err)
        }
    }
    static async update(req,res){
        try{
            const [ err, data ] = await new CategoryService({
                key: req.query?.orderBy ?? "id",
                value: req.params.id,
                fields:req.body
            })

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
        }catch (err){
            return YidException.ExceptionsError(res,err)
        }
    }
    static async delete(req,res){
        try{
            const [ err , data] = await new CategoryService({
                query:req.query,
                key: req.query?.orderBy ?? "id",
                value:req.params.id
            }).delete()
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
        }catch (err){
            return YidException.ExceptionsError(res,err)
        }
    }
}