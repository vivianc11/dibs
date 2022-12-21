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