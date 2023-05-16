import {YidException} from "@yid/handlers";
import {AuthService} from "@yid/services";
import {DeleteObjKey, JwtToken} from "@yid/helpers";

export default class AuthController {

    static async signUp(req,res){
        try{
            const [ err, data ] = await new AuthService({
                fields: req.body,
                modules: []
            }).signUp()

            if(err){
                return YidException.BadReq(res,err)
            }
            const token = await new JwtToken({
                data: {
                    id:data?.id,
                },
            }).generate()

            return YidException.Success(res,{message:"Successfully created!",data: {
                    token,
                    data
                }})
        }catch (err){
            throw YidException.ExceptionsError(res,err)
        }
    }

    static async signIn(req,res){
        try{
            let fieldsToken = {}
            const [ err, data ] = await new AuthService({
                fields: req.body,
                callback: function(result){
                    Reflect.set(fieldsToken,'userId',result?.id)
                    DeleteObjKey(result,['password','salt'])
                }
            }).signIn()

            if(err){
                return YidException.BadReq(res,err)
            }
            if(!data){
                return YidException.notFound("User not found")
            }

            const generateToken = await new JwtToken({
                data: {
                    userId: data?.id
                }
            }).generate()
            return YidException.Success(res,{
                message: "Successfully! your logged in",
                data: {
                    user:data,
                    token:generateToken
                }
            })
        }catch(err){
            return YidException.ExceptionsError(res,err);
        }
    }
}