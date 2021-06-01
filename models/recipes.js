const mongoose = require('mongoose');
module.exports = mongoose.model('recipestore', new mongoose.Schema({
    name: String,
    imageURI: String,
    description: String,
    category: String,
    no_ingredients: Number,
    minutes: Number,
    calories: Number,
    ingredients: String,
    instructions: String,
    isFeatured: Boolean,
    slug: String
}))