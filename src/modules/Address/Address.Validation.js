import Joi from "joi";


export const addAddress = {
    body: Joi.object({

        city: Joi.string().min(2).required(),
        street: Joi.string().min(2).required(),
        phone: Joi.string().min(5).required()
    }).required()
}
