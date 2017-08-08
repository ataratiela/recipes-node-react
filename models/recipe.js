const dbPool = require('../db/db-connector');

const recipe = (recipe) => {

  let state = recipe;

  return {
    state
  } 
}

exports.new = recipe; 

exports.findAll = (done) => {
  dbPool.query('SELECT * FROM Recipes', (err, res, fields) => {
    if (err) throw err;

    let recipes = res.map(r => recipe(r)).map(r => r.state);
    done(null, recipes);
  });
};

exports.save = (recipe, done) => {
  /*dbPool.query('INSERT INTO Recipes SET ?', [recipe], (err, res, fields) => {
    if (err) throw err;

    done(null, res);
  });*/
}