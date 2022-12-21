const router = require('express').Router();
const { Item } = require('../../models');

// GET ITEM
router.get('/', async (req, res) => {
  // console.log('Hello');
  try {
      const findAll = await Item.findAll()
      // console.log("Test");
      // console.log(findAll);
      res.status(200).json(findAll);
  } catch (err) {
      console.log(err)
      res.status(500).json(err)
  }
})

// FIND ONE ITEM
router.get('/:id', async (req, res) => {
    try {
      // console.log("Test");
      const itemData = await Item.findOne({
        where: {
          id: req.params.id
        },
      });
      // console.log("Testing");
      if (!itemData) {
        res.status(404).json({ message: 'No item found with this id!' });
        return;
      }
  
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// POST ALL ITEMS
router.post('/', async (req, res) => {
    try {
      
      const newItem = await Item.create({
            id: req.body.id,
            name: req.body.name,
            
            description: req.body.description,
            giver_id: req.session.user_id,
        })
        
        // console.log(req.session.user_id)
        // console.log("Created Item");
        // console.log(req.body.giver_id);
  
        res.status(200).json(newItem);
    } catch (err) {
        res.status(400).json(err);
    }
  });