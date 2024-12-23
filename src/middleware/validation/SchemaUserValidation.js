import Joi from "joi";


export const signupSchema = {

    body: Joi.object({

        name:Joi.string().min(3).max(80).required(),
        email: Joi.string().email({minDomainSegments:2 , maxDomainSegments:4 , tlds:{allow:['com','edu','eg','net']}}).required(),
        password: Joi.string().pattern(new RegExp(/^[a-z]{3,}$/)).required(),
        cPassword: Joi.string().valid(Joi.ref("password")).required(),
    }).required()

}



export const loginSchema = {

    body: Joi.object({

        email: Joi.string().email({minDomainSegments:2 , maxDomainSegments:4 , tlds:{allow:['com','edu','eg','net']}}).required(),
        password: Joi.string().pattern(new RegExp(/^[a-z]{3,}$/)).required(),

    }).required()

}


export const updateUserSchema = {

    body: Joi.object({

        email: Joi.string().email({minDomainSegments:2 , maxDomainSegments:4 , tlds:{allow:['com','edu','eg','net']}}).required(),
    }).required(),
    params: Joi.object({
        id: Joi.string().hex().length(24).required()
    })

}
