const { Schema, model } = require('mongoose');

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
         trim: true
      },
      email: {
         type: String,
         required: true,
         unique: true,
         // Must match a valid email address (look into Mongoose's matching validation)
         validate: {
            validator: (v) => isEmail(v),
            message: '{VALUE} is not a valid email'
         }
      },
      // Array of _id values referencing the Thought model
      thoughts: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
         }
      ],
      // Array of _id values referencing the User model (self-reference)   
      friends: [
         {
            type: Schema.Types.ObjectId,
            ref: 'User'
         }
      ]
   },
);

// Create a virtual proprety `friendCount` that gets the number user's friends (length of friends' array)
userSchema.virtual('friendCount').get(function () {
   return this.friends.length;
});

const User = model('User', userSchema)
module.exports = User;