import Joi from 'joi';

export const authValidation = {
    auth: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }),

    initiatePassword: Joi.object({
        email: Joi.string().required().email(),
    }),

    resetPassword: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        securityCode: Joi.number().required().min(4).max(5)
    })
}