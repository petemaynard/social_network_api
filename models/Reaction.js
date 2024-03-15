const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
   {
      reactionId: {
         type: Schema.Types.ObjectId,
         default: function() {
            return new Types.ObjectID();
         }
      },
      reactionBody: {
         type: String,
         required: true,
         maxlength: 280
      },
      username: {
         type: String,
         required: true,
      },
      createdAt: {
         type: Date,
         default: Date.now
      }
   }
);

// Use a getter method to format the timestamp on query

reactionSchema.path('createdAt').get(function (timestamp) {
   return timestamp.toISOString();
});

module.exports = reactionSchema
