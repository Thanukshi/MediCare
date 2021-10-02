import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import stocks from "./Components/Stocks";
import StockHome from "./Components/StockHome";
import Stock from "./Components/Stock";
import GetAllStock from "./Components/GetAllStock";
import EditStock from "./Components/EditStock";
import GetRequest from "./Components/GetRequest";
import History from "./Components/History";
import GetAllInvoice from "./Components/GetAllInvoice";
import InvoiceView from "./Components/InvoiceView";
import InvoiceV from "./Components/InvoiceV";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {" "}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={stocks} />
            <Route path="/stocks" component={stocks} />
            <Route path="/stock_home" component={StockHome} />
            <Route path="/stock" component={Stock} />
            <Route path="/get_stock" component={GetAllStock} />
            <Route path="/edit_stock/:id" component={EditStock} />
            <Route path="/request" component={GetRequest} />
            <Route path="/invoice" component={GetAllInvoice} />
            <Route path="/history" component={History} />
            <Route path="/invoiceView/:id" component={InvoiceView} />
            <Route path="/invoiceV" component={InvoiceV} />
           
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
