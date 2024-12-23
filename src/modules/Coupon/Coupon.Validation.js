import Joi from "joi";


export const addCoupon = {
    body: Joi.object({

        code: Joi.string().min(2).trim().required(),
        expires: Joi.date(),
        discount: Joi.number().min(0).required()
    }).required()
}


export const updateCoupon = {
    body: Joi.object({
        code: Joi.string().min(2).trim().required(),
    }).required()
}