const Invoice = require("../models/invoice.model");

const InvoiceControllers = {
  getAllDeatils: async function (req, res) {
    try {
      Invoice.findAllInvoice((err, data) => {
        return res.status(200).json({
          success: "true",
          code: 200,
          Invoice: data,
          message: "All Invoices recived successfully.",
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
      Invoice.findByID(req.params.id, (err, data) => {
        return res.status(200).json({
          success: "true",
          code: 200,
          Invoice: data,
          message: "Invoice details recived successfully.",
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

  isProceedInvoice: async function (req, res) {
    try {
      let isProceed = req.body.isProceed;
      Invoice.isProceedInvoice(req.params.id, isProceed, (err, result) => {
        return res.status(200).json({
          success: "true",
          code: 200,
          Invoice: result,
          message: "Proceed Successfully.",
        });
      });
    } catch (e) {
      return res.status(400).json({
        message: e.message,
      });
    }
  },

};
module.exports = InvoiceControllers;
