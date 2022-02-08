const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
       thoughts: [
           {
               type: Schema.Types.ObjectId,
               ref: 'Thoughts'
           }
       ],
       friends: [
           {
               type: Schema.Types.ObjectId,
               ref: 'User'
           }
       ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.reduce((total, friend) => total + friend.user.length + 1, 0);
});

const User = model('User', UserSchema);

model.exports = Pizza;