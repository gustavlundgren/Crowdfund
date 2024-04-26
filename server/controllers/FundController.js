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

const getFundById = (fundId) => {
  return FundDB.data.find((f) => f.id == fundId);
};

const getFundsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const funds = FundDB.data.filter((f) => f.userId == id);

    res.status(200).json(funds);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getUserTransactionHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const transactions = TransactionDB.data.filter((t) => t.userId == id);

    res.status(200).send(transactions);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const createFund = async (req, res) => {
  const { userId, name, description, goal } = req.body;

  try {
    const newFund = {
      id: uniqid(),
      userId,
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
    const d = new Date();

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    const newTransaction = {
      id: uniqid(),
      ammount,
      name: getFundById(fundId).name,
      date,
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

    res.status(200).json({ newTransaction });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getFunds,
  createFund,
  donate,
  getFundsByUserId,
  getUserTransactionHistory,
};
