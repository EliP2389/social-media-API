const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})

            .populate({
                path: 'thoughts',

                select: '-__v'
            })

            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one users by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({

                path: 'thoughts',

                select: '-__v'
            })

            .select('-__v')
            .then(dbUserData => {

                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // create friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true })
            .populate({
                path: 'friends'
            })
            .then(dbFriendData => res.json(dbFriendData))
            .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete user
    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true })
            .populate({
                path: 'friends'
            })
            .then(dbFriendData => {
                if (!dbFriendData) {
                    res.status(404).json({ message: 'No friend found with this id!' });
                    return;
                }
                res.json(dbFriendData);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = userController;