'use strict';

const joi  = require('@hapi/joi');

const alphaNum = joi.string().alphanum();
const integer = joi.number().integer();
const nameSchema = alphaNum.min(2).max(30);
const surnameSchema = alphaNum.min(2).max(50);
const yearSchema = integer.min(1900).max(2013);
const dateSchema = joi.date().min('1-1-1974');
const emailSchema = joi.string().email({ minDomainSegments: 2 }).max(100);
const passwordSchema = joi.string().alphanum().min(5).max(10).regex(/^[a-zA-Z0-9]{3,30}$/);

const customerSchema = joi.object().keys({
    firstname: nameSchema.required(),
    lastname: surnameSchema.required(),
    username: joi.string().alphanum().max(50).required(),
    dob: dateSchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required(),
    status: joi.string().required(),
    phone: integer
});

const bookingSchema = joi.object().keys({
    name: nameSchema,
    surname: surnameSchema,
    birthYear: yearSchema,
    mail: emailSchema
});



const roomSchema = joi.object().keys({

});

module.exports = {
    customerSchema:customerSchema,
    bookingSchema: bookingSchema,
    roomSchema: roomSchema
};