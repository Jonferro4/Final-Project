const express = require('express');
const knex = require('knex')(require('./knexfile').development);
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
//-------------------------------------------------GET ALL USERS---------------------------------//
app.get("/users", async (req, res) => {
  try {
    const users = await knex('users').select('id', 'first_name', 'last_name', 'username');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//-------------------------------------------------GET USERS BY ID---------------------------------//
app.get("/users/:id", async (req, res) => {
  try {
    const user = await knex('users')
      .where('id', req.params.id)
      .select('id', 'first_name', 'last_name', 'username')
      .first();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//-------------------------------------------------NEW USER---------------------------------//
app.post("/users", async (req, res) => {
  try {
    const { first_name, last_name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await knex('users')
      .insert({ first_name, last_name, username, password: hashedPassword })
      .returning(['id', 'first_name', 'last_name', 'username']);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---------------------------//
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));