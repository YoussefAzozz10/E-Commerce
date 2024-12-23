import Joi from "joi";


export const addTocart = {
    body:Joi.object({
        quantity: Joi.number().min(1)
    }),
}

export const updateQuantity = {
    body:Joi.object({
        quantity: Joi.number().min(1).required()
    }).required()
}