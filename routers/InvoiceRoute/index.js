const routes = require("express").Router();
const InvoiceRoutes = require("../../controllers/invoice");

//get sub rout
routes.get("/get_all_invoice", InvoiceRoutes.getAllDeatils);

//get using id sub rout
routes.get("/get_invoice/:id", InvoiceRoutes.getAllDeatilsByID);

routes.put("/proceed_invoice/:id", InvoiceRoutes.isProceedInvoice);

module.exports = routes;
