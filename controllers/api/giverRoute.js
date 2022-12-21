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

// Logging in
router.post('/login', async (req, res) => {
    try {
        const userData = await Giver.findOne({ where: { username: req.body.username } });
    
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
          return;
        }
        
        // Since we used bcrypt npm to hash the password, we need to use it to compare the hashed password with the user's actual password
        const validPassword = await bcrypt.compare(req.body.password, userData.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
          return;
        }
        // Testing to make sure we are getting correct information
        // console.log("this is the user that logged in")
        // console.log(userData)
        req.session.save(() => {
          req.session.username = userData.username;
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          res.json({ user: userData, message: 'You are now logged in!' });
        });
        
        // console.log("This is the user id from session")
        // console.log(req.session.user_id)
      } catch (err) {
        res.status(400).json(err);
      }
  });


module.exports = router;
