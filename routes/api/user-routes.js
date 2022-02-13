const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    addFriend,
    updateUser,
    deleteUser,
    deleteFriend
} = require('../../controllers/user-controller');

// Set up Get all and POST at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;   