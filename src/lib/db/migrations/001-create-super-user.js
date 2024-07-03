// migrations/001-create-users.js

const { default: User } = require("@/app/api/_lib/models/User");



module.exports = async () => {
  try {

    let data = {
      email: 'it@democracyos.org',
      password: '123123',
      username: 'admin',
      isVerified: true
    }

    const user = await User.create(data)
    console.log('Migración 001-create-users ejecutada correctamente');
  } catch (error) {
    console.error('Error en la migración 001-create-users:', error);
    throw error;
  }
};
