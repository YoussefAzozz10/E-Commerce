import Joi from "joi";



export const addProductSchema = {
    body: Joi.object({
        title: Joi.string().min(2).required(),
        price: Joi.number().min(0).required(),
        priceAfterDiscount: Joi.number().min(0),
        description: Joi.string().min(2).required(),
        stock: Joi.number().min(1).required(),
        soldItem: Joi.number(),
        discount: Joi.number(),
        subCategory: Joi.string().hex().length(24).required(),
        category: Joi.string().hex().length(24).required(),
        brand: Joi.string().hex().length(24).required()
    }).required()
}
