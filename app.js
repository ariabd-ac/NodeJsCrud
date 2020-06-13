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
app.delete("/crud/:id", async (req, res) => {
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

    const id = req.params.id;

    const updateUser = await User.update(
      {
        username,
        email,
        password,
      },
      { where: { id: id } }
    );

    await updateUser;
    res.json("berhasil di update");
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

// entry point mahasiswa
const Mahasiswa = require("./models/Mahasiswa");

// create mahasiswa

app.post("/mahasiswa", async (req, res) => {
  try {
    const { nim, name, kelas } = req.body;

    const newMhs = new Mahasiswa({
      nim,
      name,
      kelas,
    });

    await newMhs.save();
    res.json(newMhs);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Mahasiswa Eror");
  }
});

// get

app.get("/mahasiswa", async (req, res) => {
  try {
    const getAllMhs = await Mahasiswa.findAll({});
    res.json(getAllMhs);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

//  delete

app.delete("/mahasiswa/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleteMhs = await Mahasiswa.destroy({
      where: { id: id },
    });

    await deleteMhs;
    res.json("succes delete");
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

app.listen(4500, () => console.log("port berjalan 4500"));
