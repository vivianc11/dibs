const router = require('express').Router();
const { Giver, Post, Item } = require('../models');
const withAuth = require('../utils/auth');

// Need to be authenticated/signed in to view homepage
router.get('/', withAuth, async(req, res) => { 

    try {
      // Get all posts and JOIN with item and giver data
      const postData = await Post.findAll({
        include: [
          {
            model: Giver,
            attributes: ['username'],
          },
          {
            model: Item,
            attributes: ['name', 'description','giver_id']
          },
        ],
      });

       // SELECT * FROM ITEM;
    const itemData = await Item.findAll({
        include: [
          {
            model: Giver,
            attributes: ['username', 'email'],
          },
        ]
      });

          // Sequelize accent not in JSON 
    // Translate Sequelize into JSON  
    const items = itemData.map((item) => item.get({ plain: true }));
    
    console.log(items);


    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(posts);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      items,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});