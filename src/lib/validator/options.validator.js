import Joi from "joi";
import {JoiBase, JoiEmail, JoiNewPassword, JoiPassword} from "./extended.validator";
import {validator} from "./validator";

const create = async (req,res,next)=> {
    const schema = Joi.object({
        opt_value: Joi.string().required(),
        opt_name: Joi.string().required(),
        opt_type: Joi.string().required(),
        opt_value_type: Joi.string().valid(
            'string',
            'object',
            'number',
            'array',
            'function',
            'undefined',
            'null'
            ).required(),
    })
    validator(schema.validate(req.body),res,next)
}
const update = async (req,res,next)=> {
    const schema = Joi.object({
        opt_value: Joi.string().optional(),
        opt_name: Joi.string().optional(),
        opt_type: Joi.string().optional(),
        opt_value_type: Joi.string().valid(
            'string',
            'object',
            'number',
            'array',
            'function',
            'undefined',
            'null'
        ).required(),
    })
    validator(schema.validate(req.body),res,next)
}

const OptionsValidator = {
    create,update,
}
export { OptionsValidator }