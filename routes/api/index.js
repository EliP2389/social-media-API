const router = require('express').Router();
const thoughtRoutes = require('./thought-routes.js');
const userRoutes = require('./user-routes.js');

// add '/thoughts' to routes created in 'thought-routes.js'
router.use('/thoughts', thoughtRoutes)

// add prefix of `/users` to routes cretaed in `user-routes.js`
router.use('/users', userRoutes);

module.exports = router;