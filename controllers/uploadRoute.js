// Code using multer npm package to store photos to our public folder
const router = require('express').Router();
const fs = require("fs");
const { Item } = require("../models");
const multer  = require('multer')

var fileName = ""
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    fileName = `${file.originalname.replace(".png", "")}-${Date.now()}.png`
    cb(null, fileName )
  }
})
var upload = multer({ storage: storage })

// Create new photo file
router.post('/:itemID', upload.single('file'), async (req, res) => {
  console.log(upload)
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    const response = await Item.update(
      { image_url : `${req.file.destination}/${fileName}`  },
      { where: { id: req.params.itemID} } 
    );

    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
});

module.exports = router;