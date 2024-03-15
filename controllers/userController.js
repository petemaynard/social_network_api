const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

async function getAllUsers(req, res) {
   try {
      const users = await User.find();
      return res.json(users)
   } catch (err) {
      console.log(err);
      return res.status(500),json(err)
   }
}

async function getSingleUser (id) {
   try {
       return await User.findById(id);
   }
   catch (err) {
       throw new Error (err.message);
   }
}

async function createUser (data) {
   try {
       return await User.create(data);
   }
   catch (err) {
       throw new Error (err.message);
   }
}

async function updateUser (id, data) {
   try {
       return  await User.findByIdAndUpdate(id, data, {new:true})      
   } catch (err) {
       throw new Error (err.message);
   }
}

async function deleteUser (id) {
   try {
       return await User.findByIdAndDelete(id);
   }
   catch (er) {
       throw new Error (er.message);
   }
}

// Add a new friend (an existing user) to the user's friend list
async function addNewFriend () {
   try {
      return await User.findOneAndUpdate(
         { _id: req.params.userId },
         { $addToSet: {user: req.params.friendID } }
      )
   } 
   catch (err) {
      throw new Error (err.message)
   }
}

// Remove a friend (an existing user) from a user's friend list.
async function removeNewFriend () {
   try {
      return await User.findOneAndDelete(
         { _id: req.params.userId },
         { $pull: {friends: req.params.friendID } }
      )
   } 
   catch (err) {
      throw new Error (err.message)
   }
}



module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addNewFriend, removeNewFriend}