const bcrypt = require('bcrypt');


bcrypt.hash('abc', 10, (err, hash) => {
  console.log(hash);
});
