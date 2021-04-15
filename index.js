const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then((res) => {
    // Run your code here, after you have insured that the connection was made
    updateDB();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



async function updateDB() {
  try {
    // #2
    let recipe = await Recipe.create({
      title: "Pasta al Pesto",
      level: "Amateur Chef",
      ingredients: [
        "Pasta",
        "Pesto"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 20,
      creator: "Chef SP"
    });
    console.log(recipe.title);
    //#3
    await Recipe.insertMany(data);
    console.log('Recipes inserted!');
    //#4
    const filter = {
      title: "Rigatoni alla Genovese"
    };
    const update = {
      duration: 100
    };
    let doc = await Recipe.updateMany(filter, update);

    console.log(`${filter.title} updated!`);
    // #5
    await Recipe.deleteOne({
      title: 'Carrot Cake'
    });
    console.log('Recipe Deleted');

  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
}