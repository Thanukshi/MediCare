const sql = require("./db.connect");

const Stock = function (item) {
  this.stockCode = item.stockCode;
  this.bioName = item.bioName;
  this.medicine = item.medicine;
  this.quantity = item.quantity;
  this.sellingPrice = item.sellingPrice;
};

Stock.createStock = (newdetails, result) => {
  sql.query("INSERT INTO stockmanagements SET ?", newdetails, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err.message, "");
      return;
    }

    console.log("new item aded success. ", {
      id: res.insertId,
      ...newdetails,
    });
    result("", { id: res.insertId, ...newdetails });
  });
};

Stock.findAllStock = (result) => {
  sql.query("SELECT * FROM stockmanagements", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, "");
      return;
    }

    if (res.length) {
      console.log("found stock list: ", res);
      result(null, res);
      return;
    }
    // not found item with the itemname
    result({ kind: "stock not found" }, "");
  });
};

Stock.findByID = (id, result) => {
  sql.query(
    `SELECT * FROM stockmanagements WHERE stockID ='${id}' `,
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

//check whether the stock code already exit or not
Stock.findStockCode = (stockCode, result) => {
  sql.query(
    `SELECT * FROM stockmanagements WHERE stockCode='${stockCode}' `,
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

////check whether the bino name already exit or not
Stock.findbioName = (bioName, result) => {
  sql.query(
    `SELECT * FROM stockmanagements WHERE bioName='${bioName}' `,
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

//check whether the medicine already exit or not
Stock.findmedicine = (medicine, result) => {
  sql.query(
    `SELECT * FROM stockmanagements WHERE medicine='${medicine}' `,
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

Stock.updateStockDetails = (
  id,
  bioName,
  medicine,
  quantity,
  sellingPrice,
  result
) => {
  sql.query(
    `UPDATE stockmanagements SET bioName='${bioName}', medicine='${medicine}', quantity=${quantity}, sellingPrice=${sellingPrice} WHERE stockID ='${id}' `,
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

Stock.DeletebyID = (id, result) => {
  sql.query(
    `DELETE FROM stockmanagements WHERE stockID  ='${id}' `,
    (err, res) => {
      if (err) {
        result(err, "");
        return;
      }

      if (res.length) {
        result("", res);
        return;
      }
      // not found post with the id
      result({ kind: "Delete Not Success" }, "");
    }
  );
};

module.exports = Stock;
