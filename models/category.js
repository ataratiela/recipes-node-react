var dbPool = require('../db/db-connector');

const category = (category) => {

  let state = category;

  return {
    state
  } 
}

exports.findAll = (done) => {
  dbPool.query('SELECT * FROM Categories', (err, res, fields) => {
    if (err) throw err;

    let categories = res.map(r => category(r)).map(c => c.state);
    done(null, categories);
  });
};