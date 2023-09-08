const express = require('express');
const { getTotalRevenueController, getTotalQualitySoldController, getTopProductController, getAveragePriceController, getTotalCombinationController, getHighestController, getSalaryExpenseController } = require('../controllers/SaleController');
const router = express.Router();

//routing
//get total revenue
router.get("/total-revenue",getTotalRevenueController);
router.get("/quantity-by-product",getTotalQualitySoldController);
router.get("/top-products",getTopProductController);
router.get("/average-price",getAveragePriceController);
router.get("/revenue-by-month",getTotalCombinationController);
router.get('/highest-quantity-sold',getHighestController);
router.get("/department-salary-expense",getSalaryExpenseController);

module.exports = router;