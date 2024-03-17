// const { ObjectId } = require('mongoose').Types;
const User = require('../models/User');

async function getAllUsers() {
   try {
      return await User.find();
   } catch (err) {
      console.log(err);
      return res.status(500).json(err)
   }
}

async function getSingleUser (id) {
   try {
       return await User.findById(id)
       .populate('thoughts');
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

async function updateUserById (id, data) {
   try {
       return  await User.findByIdAndUpdate(id, data, {new:true})      
   } catch (err) {
       throw new Error (err.message);
   }
}

async function deleteUserById (id) {
   try {
       await User.findByIdAndDelete(id);
       await Thought.deleteMany({ username: resourceLimits.username })
       return
   }
   catch (er) {
       throw new Error (er.message);
   }
}

// Add a new friend (an existing user) to the user's friend list
async function addNewFriend (id, friendId) {
   try {
      return await User.findOneAndUpdate(
         { _id: id },
         { $addToSet: {friends: friendId } }
      )
   } 
   catch (err) {
      throw new Error (err.message)
   }
}

// Remove a friend (an existing user) from a user's friend list.
async function removeNewFriend (id, friendId) {
   try {
      return await User.findOneAndDelete(
         { _id: id },
         { $pull: {friends: friendId } }
      )
   } 
   catch (err) {
      throw new Error (err.message)
   }
}



module.exports = { getAllUsers, getSingleUser, createUser, updateUserById, deleteUserById, addNewFriend, removeNewFriend}