const sequelize = require('../config/connection');
const Item = require('../models/Item');

test('Checks for null values', async () => {
    const item1 = {};
  
    // We require that name, description be NOT NULL
    const item2 = {
      id: 2,
      name: 'apple',
      description: 'red',
    };
  
    const newItem1 = Item.build(item1);
    const newItem2 = Item.build(item2);

    // We want newItem1 to fail and newItem2 to pass, if both conditions happen, then the test is sucessful in checking that our application/code is correct!
    await expect(newItem1.validate()).rejects.toThrow('notNull');
    await expect(newItem2.validate()).resolves.not.toThrow();
  });