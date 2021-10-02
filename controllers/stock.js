const Stock = require("../models/stock.model");

const StockControllers = {

  //Add item function
  AddStock: async function (req, res) {
    const newDetails = new Stock({

      //assign user input data
      stockCode: req.body.stockCode,
      bioName: req.body.bioName,
      medicine: req.body.medicine,
      quantity: req.body.quantity,
      sellingPrice: req.body.sellingPrice,
    });
    try {

      //check whether the stock code filed filled or not
      if (!req.body.stockCode) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Stock Code must be filled.",
        });
      }
    //check whether the bio name filed filled or not
      if (!req.body.bioName) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Bio Name must be filled.",
        });
      }
      
      //check whether the medicine filed filled or not
      if (!req.body.medicine) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Medicine must be filled.",
        });
      }

      //check whether the quantity filed filled or not
      if (!req.body.quantity) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Quantity must be filled.",
        });
      }

      //check whether the sselling price filed filled or not
      if (!req.body.sellingPrice) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Selling Price must be filled.",
        });
      }

     
      let StockCode = req.body.stockCode;
      //let BioName = req.body.bioName;
      let Medicine = req.body.medicine;
      Stock.findStockCode(StockCode, (err, data) => {
        if (data && data.length) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: `This ${StockCode} is already exist.`,
          });
        } 
        else {
          Stock.findmedicine(Medicine, (err, data) => {
            if (data && data.length) {
              return res.status(200).json({
                code: 400,
                success: false,
                status: "Bad Request",
                message: `This ${Medicine} is already exist.`,
              });
            } else {
              Stock.createStock(newDetails, (err, data) => {
                if (err) {
                  return res.status(500).json({
                    code: 500,
                    success: false,
                    status: "Internal Server Error",
                    message: err.message,
                  });
                } else {
                  return res.status(200).json({
                    success: "true",
                    code: 200,
                    Stock: data,
                    message: "New item added successfully.",
                  });
                }
              });
            }
          });
        }
      });
    
    
    } catch (e) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: e.message,
      });
    }
  },

  //get details function
  getAllDeatils: async function (req, res) {
    try {
      Stock.findAllStock((err, data) => {
        return res.status(200).json({
          success: "true",
          code: 200,
          Stock: data,
          message: "All item in stock recived successfully.",
        });
      });
    } catch (e) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: e.message,
      });
    }
  },

  //get details by using ID function
  getAllDeatilsByID: async function (req, res) {
    try {
      Stock.findByID(req.params.id, (err, data) => {
        return res.status(200).json({
          success: "true",
          code: 200,
          Stock: data,
          message: "Medicine details recived successfully.",
        });
      });
    } catch (e) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: e.message,
      });
    }
  },

  //update stock details function
  updateStockDetails: async function (req, res) {
    try {
      let BioName = req.body.bioName;
      let Medicine = req.body.medicine;
      let Qnty = req.body.quantity;
      let SellPrice = req.body.sellingPrice;
      Stock.updateStockDetails(
        req.params.id,
        BioName,
        Medicine,
        Qnty,
        SellPrice,
        (err, result) => {
          return res.status(200).json({
            success: "true",
            code: 200,
            Stock: result,
            message: "Update Successfully.",
          });
        }
      );
    } catch (e) {
      return res.status(400).json({
        message: e.message,
      });
    }
  },

  //delete stock details function
  deleteStockDetails: async function (req, res) {
    try {
      Stock.DeletebyID(req.params.id, (err, result) => {
        return res.status(200).json({
          success: "true",
          code: 200,
          Stock: result,
          message: "Deleted successfully.",
        });
      });
    } catch (e) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: e.message,
      });
    }
  },
};
module.exports = StockControllers;
