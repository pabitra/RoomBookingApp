const { check, validationResult } = require('express-validator/check');
var customerdbAcess = require('../db/knex.customer');

var postValidation = function (req, res, next){
    check('firstname').isEmpty().withMessage('must be a valid test');
    check('lastname').isEmpty();
    check('email').isEmpty().isEmail();
    try {
        validationResult(req).throw();
        next();
    } catch (err) {
        res.status(422).json({ errors: err.mapped() });
    }
};

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
    
    customerdbAcess.add(req.body)
        .then(function (customerID) {
            return customerdbAcess.getSingle(customerID);
        })
        .then(function (customer) {
            res.json(customer);
        })
        .catch(function (error) {
            next(error);
        });
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
    deleteCustomer: deleteCustomer,
    postValidation: postValidation
};