const sequelize = require('../config/connection');
const { Giver, Post, Item } = require('../models');

const giverData = require('./giverData.json');
// const takerData = require('./takerData.json');
const postData = require('./postData.json');
// const itemData = require('./itemData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // bulk creates giver constant
  const giver = await Giver.bulkCreate(giverData, {
    individualHooks: true,
    returning: true,
  });

  // bulk create item constant
  // const item = await Item.bulkCreate(itemData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // bulk create post
  // const post = await Post.bulkCreate(postData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedDatabase();