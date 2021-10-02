const sql = require("./db.connect");

const Invoice = function (item) {
  this.invoice_id = item.invoice_id;
  this.NIC = item.NIC;
  this.order_id = item.order_id;
  this.amount = item.amount;
  this.date = item.date;
  this.isProceed = item.isProceed;
};

Invoice.findAllInvoice = (result) => {
  sql.query("SELECT * FROM invoice", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, "");
      return;
    }

    if (res.length) {
      console.log("found Invoice list: ", res);
      result(null, res);
      return;
    }
    // not found item with the itemname
    result({ kind: "Invoice not found" }, "");
  });
};

Invoice.findByID = (id, result) => {
  sql.query(
    `SELECT * FROM invoice WHERE invoice_id ='${id}' `,
    (err, res) => {
      if (err) {
        result(err, "");
        return;
      }

      if (res) {
        result("Recived", res);
        return;
      }
      // not found post with the id
      result({ kind: "Recived Not Success" });
    }
  );
};

Invoice.isProceedInvoice = (id, isProceed, result) => {
  sql.query(
    `UPDATE invoice SET isProceed='${isProceed}' WHERE invoice_id ='${id}' `,
    (err, res) => {
      if (err) {
        result(err, "");
        return;
      }

      if (res) {
        result("Updated", res);
        return;
      }
      // not found post with the id
      result({ kind: "Update Not Success" });
    }
  );
};


module.exports = Invoice;
