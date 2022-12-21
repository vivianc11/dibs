const Taker = require('./Taker');
const Giver = require('./Giver');
const Post = require('./Post');
const Item = require('./Item');
const Image = require('./Image');

// Define a 'Giver' as having many posts, items; so foreign key is 'giver_id' in both Post and Item models
Giver.hasMany(Post, {
    foreignKey: 'giver_id',
});

Post.belongsTo(Giver, {
    foreignKey: 'giver_id'
});

Giver.hasMany(Item, {
    foreignKey: 'giver_id',
});

Item.belongsTo(Giver, {
    foreignKey: 'giver_id'
});

Post.hasOne(Item,{
    foreignKey: 'item_id',
    onDelete:'CASCADE'
});

Item.belongsTo(Post,{
    foreignKey: 'item_id',    
});

Item.hasOne(Image,{
    foreignKey: 'item_id',
    onDelete:'CASCADE'
});

Image.belongsTo(Item,{
    foreignKey: 'item_id',    
});

module.exports = {
    Taker,
    Giver,
    Post,
    Item,
    Image
};