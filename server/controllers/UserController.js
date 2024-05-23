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

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = UserDB.data.find((u) => u.username == username);

  if (user == null) {
    return res.status(404).json({ error: "Username not found" });
  }

  try {
    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return res.status(401).status({ error: "Invalid password" });
    }

    res.status(200).json({
      user: { id: user.id, username: user.username, balance: user.balance },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const duplicate = UserDB.data.find((u) => u.username === username);

  if (duplicate) {
    console.log(duplicate);
    return res.status(409).json({ message: "User already exists" });
  }

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
  const user = UserDB.data.find((u) => u.id == id);

  if (user == null) {
    return "User not found";
  } else {
    return user.balance;
  }
};

const updateBalance = async (id, ammount) => {
  const user = UserDB.data.find((u) => u.id == id);

  if (user == null) {
    return "User not found";
  } else {
    user.balance -= ammount;
  }

  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(UserDB.data)
  );
};

const getUser = (req, res) => {
  const { id } = req.params;

  if (id == null) {
    return res.status(400).json({ error: "Id is required to get a user" });
  }

  try {
    const user = UserDB.data.find((u) => u.id == id);

    if (user == null) {
      return res.status(404).json({ error: "No user found with that id" });
    }

    user.passwordHash = undefined;

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { getBalance, updateBalance, login, register, getUser };
