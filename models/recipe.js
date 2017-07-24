var dbPool = require('../db/db-connector');

const recipe = ({ RecipeID, Name, Description, Image, 
    Dificulty, Diners, PrepTime, UserID, CategoryID }) => {

  let state = {
    recipeID: RecipeID,
    name: Name,
    description: Description,
    image: Image,
    dificulty: Dificulty,
    diners: Diners,
    PrepTime: PrepTime,
    userID: UserID,
    categoryID: CategoryID
  }

  return {
    state
  } 
}

exports.findAll = (done) => {
  dbPool.query('SELECT * FROM Recipes', (err, res, fields) => {
    if (err) throw err;

    let recipes = res.map(r => recipe(r)).map(r => r.state);
    done(null, recipes);
  });
};