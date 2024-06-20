const bcrypt = require('bcrypt');


module.exports = {
  async up(db, client) {
    console.log('migrado');
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    let password = '123123'
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt)
    const data = {
      email: 'it@democracyos.org',
      password: password,
      username: 'adminuser',
      role: 'admin',
      isVerified: true

    }
    await db.collection('users').insertOne(data)
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
