const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        }
    },
    {
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        username: {
            type: String,
            required: 'Username required'
        }
    },
    {
        reactions: [
            {
                reactionId: {
                    type: Schema.Types.ObjectId,
                    default: () => new Types.ObjectId()
                }
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
)

