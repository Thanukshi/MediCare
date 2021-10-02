const routes = require("express").Router();
const StockMainRoute = require("./StockRoute");
const InvoiceMainRoute = require("./InvoiceRoute");

routes.use("/stock", StockMainRoute);

routes.use("/invoice", InvoiceMainRoute);

module.exports = routes;
