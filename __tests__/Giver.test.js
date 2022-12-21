const sequelize = require('../config/connection');
const Giver = require('../models/Giver');

test('Checks for null values', async () => {
    const user1 = {};
  
    // We require that username, email, password be NOT NULL
    const user2 = {
      username: 'test',
      email: 'test@gmail.com',
      password: 'longpassword',
    };
  
    const newUser1 = Giver.build(user1);
    const newUser2 = Giver.build(user2);
    
    // We want newUser1 to fail and newUser2 to pass, if both conditions happen, then the test is sucessful in checking that our application/code is correct!
    await expect(newUser1.validate()).rejects.toThrow('notNull');
    await expect(newUser2.validate()).resolves.not.toThrow();
  });

test('Checks for short passwords', async () => {
    // We require password be AT LEAST 4 characters long
    const user1 = {
        username: 'test',
        email: 'test@gmail.com',
        password: '123',
      };
    
      const user2 = {
        username: 'test',
        email: 'test@test.com',
        password: 'pass',
      };
    
      const newUser1 = Giver.build(user1);
      const newUser2 = Giver.build(user2);
    
      await expect(newUser1.validate()).rejects.toThrow(
        'Validation len on password failed'
      );
      await expect(newUser2.validate()).resolves.not.toThrow();
});