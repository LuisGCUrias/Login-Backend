// VALIDADORES
const Joi = require("joi")


//ESQUEMA DE VALIDACION.
const singupSchema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .trim()
    .empty('')
    .required(),

    password: Joi.string()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9@$!%*?.&]{3,30}$'))
    .trim()
    .empty('')
    .required(),

    email: Joi.string()
    .email()
    .empty('')
    .trim()
    .required(),
})

module.exports = singupSchema