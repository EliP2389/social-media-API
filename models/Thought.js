const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
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

const ReactionSchema = new Schema(
    {
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

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.reduce((total, reactions) => total + reactions.thought.length + 1, 0);
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;