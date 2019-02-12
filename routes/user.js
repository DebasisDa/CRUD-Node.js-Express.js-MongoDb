const _ = require('lodash')
const bcrypt = require('bcryptjs');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// POST API 
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email }); // For dublicate email id.
  if (user) return res.status(400).send('User already registered.');

  user = new User(
      {
          name : req.body.name,
          email : req.body.email,
          password : req.body.password
      });

  const salt = await bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  await user.save();
  res.send(_.pick(user,['_id', 'name', 'email','password'])).status(201);
});



// GET API 
router.get('/', async (req, res) => {

  let user = await User.find(); 
  res.send(user);
});


// DELETE API 
router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  const user = await User.findById(id);
  if (!user) 
  {
      return res.status(401).send('Invalid user...');   
  }
  user.remove();
  res.send('Data deleted');
});


// PUT API 
router.put('/:id', async (req, res) => {
  var id = req.params.id;
  const user = await User.findById(id);
  if (!user)
  {
      return res.status(401).send('Invalid user...');   
  }
  

  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save();

  res.send('Data updated');
});




module.exports = router;
