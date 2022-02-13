const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
    // the functions will go in her as methods
    // get all pizzas
    getAllUser(req, res) {
        User.find({})
        // populates all comments
        .populate({
            path: 'thoughts',
            // minus sign in front of the '__v' means we dont want it to be returned
            select: '-__v'
        })
        // removes '__v" field from pizzas
        .select('-__v')
        // this method 
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one pizza by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            // populates comments with pizzas select by ID
            path: 'thoughts',
            // removes v field from comments
            select: '-__v'
        })
        // removes v field from pizza
        .select('-__v')
        .then(dbUserData => {
            // If no pizza is found, send 404
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbuserData);
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
    }
};

module.exports = userController;