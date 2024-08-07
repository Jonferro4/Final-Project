const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'SuperSecretKey';

//-------------------------------------------------GET ALL USERS---------------------------------//
router.get("/", async (req, res) => {
  try {
    const users = await knex('users').select('id', 'first_name', 'last_name', 'username');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//-------------------------------------------------GET USER BY ID---------------------------------//
router.get("/:id", async (req, res) => {
  try {
    const user = await knex('users')
      .where('id', req.params.id)
      .select('id', 'first_name', 'last_name', 'username')
      .first();
    if (!user) {
      return res.status(404).json({ message: 'User not found/doesnt exist' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//-------------------------------------------------CREATE USER---------------------------------//
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, username, password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required to create a user" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [newUser] = await knex('users')
      .insert({ first_name, last_name, username, password: hashedPassword })
      .returning(['id', 'first_name', 'last_name', 'username']);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error in user creation:', error);
    res.status(400).json({ message: error.message });
  }
});
//-------------------------------------------------USER LOGIN---------------------------------//
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await knex('users').where({ username }).first();
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
      maxAge: 3600000, 
      path: '/' 
    });
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Login ERROR' });
  }
});
//-------------------------------------------------USER LOGOUT---------------------------------//
router.post("/logout", (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

module.exports = router;