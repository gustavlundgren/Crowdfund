const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");

const UserDB = {
  data: require("../models/users.json"),
  setUsers: function (data) {
    this.data = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const login = () => {};

const register = async (req, res) => {
  const { username, password } = req.body;

  UserDB.data.forEach((u) => {
    if (u.username == username)
      res.status(409).json({ error: "Username is allready taken" });
    return;
  });

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const newUser = {
      id: uniqid(),
      username,
      passwordHash,
      balance: 4000,
    };

    UserDB.setUsers([...UserDB.data, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(UserDB.data)
    );

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getBalance = (id) => {
  UserDB.data.forEach((u) => {
    if (id == u.id) {
      return u.balance;
    }
  });
};

const updateBalance = async (id, ammount) => {
  UserDB.data.forEach((u) => {
    if (id == u.id) {
      u.balance -= ammount;
    }
  });

  // write to file
  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(UserDB.data)
  );
};

module.exports = { getBalance, updateBalance, login, register };
