const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
    },
    {

        toJSON: {
            virtuals: true,
            getters: true
        }
    }


);

const ThoughtSchema = new Schema(
    {
        thoughttext: {
            type: String,
            required: true,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },

        username: {
            type: String,
            required: 'Username that created thought required'
        },
    
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);



ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;