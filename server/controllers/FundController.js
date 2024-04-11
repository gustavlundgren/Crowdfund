const uniqid = require("uniqid");

const { getBalance, updateBalance } = require("../controllers/UserController");

const FundDB = {
  data: require("../models/funds.json"),
  setFunds: function (data) {
    this.data = data;
  },
};

const TransactionDB = {
  data: require("../models/transactions.json"),
  setTransactions: function (data) {
    this.data = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const getFunds = (req, res) => {
  try {
    res.status(200).json(FundDB.data);
  } catch (err) {
    res.staus(500).json({ error: err });
  }
};

const createFund = async (req, res) => {
  const { name, description, goal } = req.body;

  try {
    const newFund = {
      id: uniqid(),
      name,
      description,
      goal,
      balance: 0,
    };

    FundDB.setFunds([...FundDB.data, newFund]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "funds.json"),
      JSON.stringify(FundDB.data)
    );

    res.status(201).json(newFund);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const donate = async (req, res) => {
  const { ammount, fundId, userId } = req.body;

  const currentBalance = getBalance(userId);

  if (ammount > currentBalance) {
    res.status(403).json({ error: "Account balance is to low" });
    return;
  }

  try {
    const newTransaction = {
      id: uniqid(),
      ammount,
      fundId,
      userId,
    };

    TransactionDB.setTransactions([...TransactionDB.data, newTransaction]);

    FundDB.data.forEach((f) => {
      if (fundId == f.id) {
        f.balance += ammount;

        updateBalance(userId, ammount);
      }
    });

    // Write file
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "funds.json"),
      JSON.stringify(FundDB.data)
    );

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "transactions.json"),
      JSON.stringify(TransactionDB.data)
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { getFunds, createFund, donate };
