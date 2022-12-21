// Start of controllers, which allows commands to Model and View components

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const uploadRoute = require("./uploadRoute");

router.use('/', homeRoutes);
router.use("/upload", uploadRoute);
router.use('/api', apiRoutes);



module.exports = router;