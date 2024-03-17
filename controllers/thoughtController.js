const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

async function getAllThought() {
   try {
      return await Thought.find();
   } catch (err) {
      console.log(err);
      return res.status(500),json(err)
   }
}

async function getSingleThought (id) {
   try {
       return await Thought.findById(id);
   }
   catch (err) {
       throw new Error (err.message);
   }
}

async function createNewThought (data) {
   try {
       const thoughtResult = await Thought.create(data);
       const userResult = await User.findByIdAndUpdate(data.userId, { $push: { thoughts: thoughtResult._id } }, { new: true });
       return thoughtResult
   }
   catch (err) {
       throw new Error (err.message);
   }
}

async function updateThoughtById (id, data) {
   try {
       return  await Thought.findByIdAndUpdate(id, data, {new:true})      
   } catch (err) {
       throw new Error (err.message);
   }
}

async function deleteThoughtById (id) {
   try {
       return await Thought.findByIdAndDelete(id);
       // Should delete any reactions that go with the thought !!
   }
   catch (er) {
       throw new Error (er.message);
   }
}

// Create a reaction stored in a single thought's reactions array field
async function addNewReaction (id, data) {
   try {
      const reactionResult = await Thought.reaction.create(data);
      const thoughtResult = await Thought.findByIdAndUpdate(id, {$push: {reactions: reactionResult._id }}, {new: true})
      return reactionResult
   } 
   catch (err) {
      throw new Error (err.message)
   }
}

// Remove a reaction
async function removeReaction (id, reactionId) {
   try {
      return await User.findOneAndDelete(
         { _id: id },
         { $pull: {friends: reactionId } }
      )
   } 
   catch (err) {
      throw new Error (err.message)
   }
}



module.exports = { getAllThought, getSingleThought, createNewThought, updateThoughtById, deleteThoughtById, addNewReaction, removeReaction}