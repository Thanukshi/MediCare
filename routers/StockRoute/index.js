const routes = require("express").Router();
const StockRoutes = require("../../controllers/stock");

//add sub rout
routes.post("/add-new-stock", StockRoutes.AddStock);

//get sub rout
routes.get("/get_all_stock", StockRoutes.getAllDeatils);

//get using id sub rout
routes.get("/get_stock/:id", StockRoutes.getAllDeatilsByID);

routes.put("/update_stock/:id", StockRoutes.updateStockDetails);

routes.delete("/delete_stock/:id", StockRoutes.deleteStockDetails);



module.exports = routes;
