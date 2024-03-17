const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction')

const thoughtSchema = new Schema(
   {
      thoughtText: {
         type: String,
         required: true,
         // Validate between 1 and 280 characters
         minlength: 1,
         maxlength: 280,

      },
      createdAt: {
         type: Date,
         default: Date.now,
      },
      username: {
         type: String,
         required: true,
      },
      reactions: [
         //These are like replies
         // Array of nested documents created with the reactionSchema
         Reaction
      ]
   },
   {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

// Use a getter method to format the timestamp on query
thoughtSchema.path('createdAt').get(function (timestamp) {
   return timestamp ? timestamp.toISOString() : null;
});

//   Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
   return this.reactions ? this.reactions.length : 0;
});

const Thought = model('Thought', thoughtSchema)
module.exports = Thought