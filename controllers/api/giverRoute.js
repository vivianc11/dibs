const router = require('express').Router();
const { Giver } = require('../../models');
const bcrypt = require('bcrypt')
const withAuth = require('../../utils/auth');

// Create New User
router.post('/signup', async (req, res) => {
    try {
        const newUser = await Giver.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            
        })
        // Testing to make sure we are getting correct information
        // console.log(req.body.username);
        // console.log(req.body.password);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;

            res.json(newUser);
        })
        // console.log('new giver created');
    } catch (err) {
        res.status(400).json(err);
    }
});

// Find all 'Givers'
router.get('/', async (req, res) => {
    try {
        const findAll = await Giver.findAll({
            attributes: { exclude: ['password'] }
        })

        res.json(findAll);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})