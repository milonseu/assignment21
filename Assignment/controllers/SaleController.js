const SaleModel = require("../models/SaleModel");

//get total revenue
const getTotalRevenueController = async(req,res)=>{
    try {
        const totalRevenue = await SaleModel.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: { $multiply: ['$quantity', '$price'] } },
            },
          },
        ]);
        res.json({ totalRevenue: totalRevenue[0].total });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
} 
//get the total quantity sold for each product
const getTotalQualitySoldController = async(req,res)=>{
    try {
        const result = await Sale.aggregate([
          {
            $group: {
              _id: '$product',
              totalQuantitySold: { $sum: '$quantity' },
            },
          },
          {
            $project: {
              _id: 0, // Exclude the _id field from the response
              product: '$_id',
              totalQuantitySold: 1,
            },
          },
        ]);
    
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

// Retrieve the top 5 products
const getTopProductController = async(req,res)=>{
    try {
        const result = await Sale.aggregate([
          {
            $group: {
              _id: '$product',
              totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
            },
          },
          {
            $sort: { totalRevenue: -1 },
          },
          {
            $limit: 5,
          },
          {
            $project: {
              _id: 0,
              product: '$_id',
              totalRevenue: 1,
            },
          },
        ]);
    
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

//get the average price of products sold
const getAveragePriceController = async(req,res)=>{
    try {
        const result = await Sale.aggregate([
          {
            $group: {
              _id: null,
              totalQuantity: { $sum: '$quantity' },
              totalPrice: { $sum: { $multiply: ['$quantity', '$price'] } },
            },
          },
          {
            $project: {
              _id: 0,
              averagePrice: { $divide: ['$totalPrice', '$totalQuantity'] },
            },
          },
        ]);
    
        if (result.length === 0) {
          res.status(404).json({ message: 'No sales data available.' });
        } else {
          res.json(result[0]);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
//calculate the total revenue for each month-year combination
const getTotalCombinationController = async(req,res)=>{
    try {
        const result = await Sale.aggregate([
          {
            $group: {
              _id: {
                year: { $year: '$date' },
                month: { $month: '$date' },
              },
              totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
            },
          },
          {
            $project: {
              _id: 0,
              year: '$_id.year',
              month: '$_id.month',
              totalRevenue: 1,
            },
          },
          {
            $sort: { year: 1, month: 1 },
          },
        ]);
    
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
//highest quality sold
const getHighestController = async(req,res)=>{
    try {
        const result = await Sale.aggregate([
          {
            $group: {
              _id: {
                date: '$date',
                product: '$product',
              },
              totalQuantitySold: { $sum: '$quantity' },
            },
          },
          {
            $sort: { totalQuantitySold: -1 },
          },
          {
            $limit: 1,
          },
          {
            $project: {
              _id: 0,
              product: '$_id.product',
              totalQuantitySold: 1,
            },
          },
        ]);
    
        if (result.length === 0) {
          res.status(404).json({ message: 'No sales data available.' });
        } else {
          res.json(result[0]);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
//salary ech department
const getSalaryExpenseController = async(req,res)=>{
    try {
        const result = await Sale.aggregate([
          {
            $group: {
              _id: '$department',
              totalSalaryExpense: { $sum: { $multiply: ['$quantity', '$price'] } },
            },
          },
          {
            $project: {
              _id: 0,
              department: '$_id',
              totalSalaryExpense: 1,
            },
          },
        ]);
    
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
module.exports = {getTotalRevenueController,getTotalQualitySoldController,getTopProductController,getAveragePriceController,getTotalCombinationController,getHighestController,getSalaryExpenseController}