const bcrypt = require('bcryptjs');

const hashedPassword = '$2a$10$GtZoLSQkV4B0QiQq6jI.DO6pcM1xp5mgFTFg0xfXZEgTUQjEn8Gq2';
const inputPassword = '4'; // Replace with the actual input password

bcrypt.compare(inputPassword, hashedPassword, (err, isMatch) => {
  if (err) throw err;
  console.log(`Password match: ${isMatch}`);
});

consol