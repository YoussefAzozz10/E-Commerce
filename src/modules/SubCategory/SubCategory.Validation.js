import Joi from "joi";


export const addSubCategoryValidation = {
    body: Joi.object({
        name: Joi.string().min(2).required(),
        category: Joi.string().hex().length(24).required()
    }).required(),
}


export const updateSubCategoryValidation = {
    body:Joi.object({
        name: Joi.string().min(2),
        category: Joi.string().hex().length(24)
    }).required(),
    params:Joi.object({
        id: Joi.string().hex().length(24).required()
    }).required()
}

export const getItemParamsRequired = {
    params: Joi.object({
        id: Joi.string().hex().length(24).required()
    }).required()
}
