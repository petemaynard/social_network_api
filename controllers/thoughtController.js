const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

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
      const thoughtResult = await Thought.findOneAndUpdate(id)
      thoughtResult.reactions.push(data)
      return thoughtResult
   } 
   catch (err) {
      throw new Error (err.message)
   }
}

// Remove a reaction  THIS NEED WORK
async function removeReaction (id, reactionId) {
   try {
      const thoughtResult = await Thought.findOneAndDelete(id)
      thoughtResult.reactions.pull(reactionId)
   } 
   catch (err) {
      throw new Error (err.message)
   }
}



module.exports = { getAllThought, getSingleThought, createNewThought, updateThoughtById, deleteThoughtById, addNewReaction, removeReaction}