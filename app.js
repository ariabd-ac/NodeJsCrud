const express = require("express");
const app = express();

const db = require("./config/db");

app.get("/", (req, res) => res.send("respon nodejs berhasill"));

app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() => console.log("berhasil konek dgn db"));

const User = require("./models/User");
//create

app.post("/crud", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

// read

app.get("/crud", async (req, res) => {
  try {
    const getAllUser = await User.findAll({});
    res.json(getAllUser);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

// salah satu

app.get("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const getUser = await User.findOne({
      where: { id: id },
    });

    res.json(getUser);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

// delete
app.get("/crud/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleteUser = await User.destroy({
      where: { id: id },
    });

    await deleteUser;
    res.json("berhasil di busek");
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

// update
app.put("/crud/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
  } catch (error) {}
});

app.listen(4500, () => console.log("port berjalan 4500"));
