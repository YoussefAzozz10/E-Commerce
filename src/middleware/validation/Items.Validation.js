import Joi from "joi";



const addFormat = {
    body: Joi.object({
        name: Joi.string().min(2)
    }).required()
}


export const getItemByIdFormat = {
    params: Joi.object({
        id: Joi.string().hex().length(24).required()
    }).required()
}

export const addItem = {
    ...addFormat
}

export const getItemById = {
    params: Joi.object({
        id: Joi.string().hex().length(24)
    })
}

export const deleteItemById = {
    ...getItemByIdFormat
}


export const updateItemById = {
    body: Joi.object({
        name: Joi.string().min(2)
    }),
    ...getItemByIdFormat
}

export const getUserByQueryRequest = {
    query: Joi.object({
        id: Joi.string().hex().length(24)
    })
}

export const updateUserPassword = {
    body: Joi.object({
        password: Joi.string().min(3).required()
    }).required()
}