import Joi from "joi";
import {JoiBase, JoiEmail, JoiNewPassword, JoiPassword} from "./extended.validator";
import {validator} from "./validator";

const signIn = async (req,res,next)=> {
    const schema = Joi.object({
        email: JoiEmail.required(),
        password: JoiPassword.required()
    })
    validator(schema.validate(req.body),res,next)
}

const signInUsername = async (req,res,next)=> {
    const schema = JoiBase.append({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
    validator(schema.validate(req.body),res,next)
}

const ResetPasswordValidator = async ( req,res,next)=> {
    const schema = JoiBase.append({
        token : Joi.string().required(),
        password: JoiNewPassword.required(),
        confirm_password: JoiMatch('password')
    })

    validator(schema.validate(req.body),res,next)
}


const ForgotUsernameValidator = async (req,res,next)=> {
    const schema = JoiBase.append({
        email: JoiEmail.required()
    })

    validator(schema.validate(req.body),res,next)
}

const CheckUsername = async (req,res,next)=>{
    const schema = JoiBase.append({
        username: Joi.string().required()
    })

    validator(schema.validate(req.body),res,next)
}

const signUpValidator = async (req,res,next)=> {
    const schema = JoiBase.append({
        // first_name: Joi.string().trim().required(),
        // last_name: Joi.string().trim().required(),
        email: JoiEmail.required(),
        password: JoiPassword.required(),
        fullName: Joi.string().required(),
        // role: Joi.number().required()
    })

    validator(schema.validate(req.body),res, next)
}

const AuthValidator = {
    signInUsername,
    signIn,
    CheckUsername,
    ForgotUsernameValidator,
    ResetPasswordValidator,
    signUpValidator
}
export { AuthValidator }