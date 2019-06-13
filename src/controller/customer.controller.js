
'use strict';

const customerdbAcess = require('../db/knex.customer');
const schemaCollection = require('../validation/validation.schema');
const Joi = require('@hapi/joi');
var getAllCustomers = function (req, res, next) {
    customerdbAcess.getAll()
        .then(function (shows) {
            res.status(200).json(shows);
        })
        .catch(function (error) {
            next(error);
        });
};

var getCustomerbyId = function (req, res, next) {

    customerdbAcess.getSingle(req.params.id)
        .then(function (show) {
            res.status(200).json(show);
        })
        .catch(function (error) {
            next(error);
        });

};

var createCustomer = function (req, res, next) {
    try {
        let data = req.body;
        Joi.validate(data, schemaCollection.customerSchema, (err, value) => {

            if (err) {

                let errMsg = err.details.map(d => {
                    return d.message;
                });

                // send a 422 error response if validation fails
                res.status(422).json({
                    status: 'error',
                    message: 'Invalid request data',
                    data: errMsg
                });

            } else {
                customerdbAcess.add(req.body)
                    .then(function (customerID) {
                        return customerdbAcess.getSingle(customerID);
                    })
                    .then(function (customer) {
                        res.json(customer);
                    })
                    .catch(function (error) {
                        res.status(500).json({
                            status: 'error',
                            message: 'Internal server error',
                            data: error
                        });
                    });

            }

        });

    } catch (error) {
        res.json(error);
    }
};

var updateCustomer = function (req, res, next) {
    if (req.body.hasOwnProperty('id')) {
        return res.status(422).json({
            error: 'You cannot update the id field'
        });
    }
    customerdbAcess.update(req.params.id, req.body)
        .then(function () {
            return customerdbAcess.getSingle(req.params.id);
        })
        .then(function (show) {
            res.status(200).json(show);
        })
        .catch(function (error) {
            next(error);
        });
};
var deleteCustomer = function (req, res, next) {
    customerdbAcess.getSingle(req.params.id)
        .then(function (show) {
            customerdbAcess.deleteItem(req.params.id)
                .then(function () {
                    res.status(200).json(show);
                })
                .catch(function (error) {
                    next(error);
                });
        }).catch(function (error) {
            next(error);
        });
};

module.exports = {
    getAllCustomers: getAllCustomers,
    getCustomerbyId: getCustomerbyId,
    createCustomer: createCustomer,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer
};