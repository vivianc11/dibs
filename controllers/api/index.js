const router = require('express').Router();

const giverRoutes = require('./giverRoute');
const itemRoutes = require('./itemRoute');
const postRoutes = require('./postRoute');


router.use('/giver', giverRoutes);
router.use('/item', itemRoutes);
router.use('/post', postRoutes);


module.exports = router;