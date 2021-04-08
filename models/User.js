const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const FriendSchema = new Schema(

    {
        // set custom id to avoid confusion with parent comment _id
           friendId: {
               type: Schema.Types.ObjectId,
               default: () => new Types.ObjectId()
           },
           friendName: {
               type: String,
               trim: true
           }
       },
       { // alows to user getters (which is what we have date format)
           toJSON: {
               virtuals: true,
               getters: true
           }
       }

)

const UserSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: 'You need to provide a pizza name!',
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        
      },
      size: {
        type: String,
        // enumerable iterated over
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
      },
      toppings: []
      ,
      thoughts: [ 
        {
          type: Schema.Types.ObjectId, // the data is stored as an object
          ref: 'Thought' // defined here to map to Thought model
        }
      ],
      friends: [FriendSchema],
    },
    {
      toJSON: { // allow virtuals to be used
        virtuals: true,
        getters: true // coming from utils
      },
      id: false
    }
);


  // virtual - get total count of friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});



  // create the Pizza model using the PizzaSchema
  const User = model('User', UserSchema);

  // export the Pizza model
  module.exports = User;


