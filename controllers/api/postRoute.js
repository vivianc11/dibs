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

// Find all posts
router.get('/', async (req, res) => {
    console.log('Hello');
    try {
        const findAll = await Post.findAll()
        // console.log("Test");
        // console.log(findAll);
        res.json(findAll);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

// Find one post
router.get('/:id', async (req, res) => {
    try {
      // console.log("Post");
      const postData = await Post.findOne({
        where: {
          id: req.params.id
        },
      });
      // console.log("Testing");
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
    try {
      // console.log("Test");
      const postData = await Post.destroy({
        where: {
          id: req.params.id
        },
      });
      // console.log("Testing");
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;