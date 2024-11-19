const Joi=require('joi');

const registerSchema= Joi.object({
    First_Name:Joi.string().trim().required(),
    Last_Name:Joi.string().trim().required(),
    Email:Joi.string().email().trim().required(),
    Profile_Picture:Joi.string().trim().required(),
    Birthdate:Joi.string().trim().required(),
    Phone_Number:Joi.string().length(10).trim().required(),
    Password:Joi.string().trim().min(8).required()
});

const loginSchema= Joi.object({
    Email:Joi.string().email().trim().required(),
      Password:Joi.string().trim().required()
})


module.exports={
    registerSchema,
    loginSchema,
}