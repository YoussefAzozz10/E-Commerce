import Joi from "joi";



export const addReviewValidation = {

    body:Joi.object({
        text: Joi.string().min(5).required(),
        rate: Joi.number().min(1).max(5).required()
    }).required()
    ,
    params: Joi.object({
        productId: Joi.string().hex().length(24).required(),
    }).required()
}


export const updateReviewValidation = {

    body:Joi.object({
        text: Joi.string().min(5),
        rate: Joi.number().min(1).max(5)
    }).required()
    ,
    params: Joi.object({
        id: Joi.string().hex().length(24).required(),
    }).required()
}
