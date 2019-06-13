var express = require('express');

var router = express.Router();

var customerController = require('../controller/customer.controller');

// *** GET all shows *** //
router.get('/customers', customerController.getAllCustomers );
// *** GET single show *** //
router.get('/customers/:id', customerController.getCustomerbyId);
// *** add show *** //
router.post('/customers', customerController.createCustomer);
// *** update show *** //
router.put('/customers/:id', customerController.updateCustomer);
// *** delete show *** //
router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;
