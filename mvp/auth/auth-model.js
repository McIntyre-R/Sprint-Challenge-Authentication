const db = require('../database/dbConfig')


module.exports = {
    findBy,
    registerUser
}


async function registerUser(user) {
    return db('users')
    .insert(user, 'id')
    .then(user => ({ user}));
}

async function findBy(filter) {
    return db("users").where(filter);
  }
