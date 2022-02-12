const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        email: {
            type: String,
            required: 'Email is required',
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
       thoughts: [
           {
               _id: ['Thought']
               
           }
       ],
       friends: [
           {
               _id: ['User']
           }
       ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.reduce((total, friend) => total + friend.user.length + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;