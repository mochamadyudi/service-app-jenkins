import Joi from "joi";
import {JoiBase, JoiEmail, JoiNewPassword, JoiPassword} from "./extended.validator";
import {validator} from "./validator";

const create = async (req,res,next)=> {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().optional(),
    })
    validator(schema.validate(req.body),res,next)
}
const update = async (req,res,next)=> {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().optional(),
    })
    validator(schema.validate(req.body),res,next)
}

const PermissionValidator = {
    create,update,
}
export { PermissionValidator }