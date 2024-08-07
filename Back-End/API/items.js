const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);

//-------------------------------------------------GET ALL ITEMS---------------------------------//
router.get("/", async (req, res) => {
  try {
    const items = await knex('items').select('*');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//-------------------------------------------------GET ITEMS BY ID---------------------------------//
router.get("/:id", async (req, res) => {
  try {
    const item = await knex('items').where('id', req.params.id).first();
    if (!item) {
      return res.status(404).json({ message: 'Item not found/doesnt exist' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//-------------------------------------------------GET ITEMS BY USERID---------------------------------//
router.get("/user/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const userItems = await knex('items')
        .where('user_id', userId)
        .select('*');
      
      if (userItems.length === 0) {
        return res.status(404).json({ message: 'No items found for spec user' });
      }
      
      res.json(userItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });  
//-------------------------------------------------CREATE NEW ITEM---------------------------------//
router.post("/", async (req, res) => {
  try {
  
    const { user_id, name, description, quantity } = req.body;

  
    if (!user_id || !name || !quantity) {
      console.log("Missing fields:", { user_id, name, description, quantity });
      return res.status(400).json({ message: "Missing required fields for creating an item" });
    }

    const [newItem] = await knex('items')
      .insert({ user_id, name, description, quantity })
      .returning('*');
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//-------------------------------------------------UPDATE ITEM DETAILS---------------------------------//
router.patch("/:id", async (req, res) => {
  try {
    const { name, description, quantity } = req.body;
    const [updatedItem] = await knex('items')
      .where('id', req.params.id)
      .update({ name, description, quantity })
      .returning('*');
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found/doesnt exist' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;