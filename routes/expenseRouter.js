const express = require('express');

const routes = express.Router();

const expenseController = require('../controller/expController');

routes.get('/', expenseController.getExpense);
routes.post('/', expenseController.addExpense);
routes.delete('/:id', expenseController.deleteExpense);

module.exports = routes;
