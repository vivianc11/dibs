const router = require('express').Router();
const { Post } = require('../../models');

// Create new post
router.post('/', async (req, res) => {
  try {
    // console.log("Hello Post"); 
    const newPost = await Post.create({
          // A post have these two attributes
          giver_id: req.session.user_id,
          item_id: req.body.item_id
      })
    //   console.log("Created Post");
      // console.log(req.body.giver_id);
      // console.log(req.body.item_id);

      res.status(200).json(newPost);
  } catch (err) {
      res.status(400).json(err);
  }
});