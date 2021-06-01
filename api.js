const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const app = express();
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        await next();
    }
});

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("[SERVER] DB connected."))
    .catch(error => console.log(error));



const recipeSchema = require('./models/recipes');
const categorySchema = require('./models/categories');



app.post('/create-new-recipe', async (req, res) => {
    const newRecipe = new recipeSchema({
        name: "Test Recipe",
        imageURI: "https://i.imgur.com/pXhKZRE.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada quis massa luctus condimentum. Curabitur elementum ut risus at iaculis. Mauris quis pretium purus. Maecenas at quam nibh. Phasellus mollis, lectus et rutrum ullamcorper, elit tortor sodales tortor, sit amet dignissim nisl est vel mauris. Nulla odio quam, varius eget pulvinar a, pharetra a neque. Donec metus est, pulvinar a lacinia nec, pulvinar ut massa. Vivamus tempor eros id risus aliquam, vitae vehicula lacus condimentum. Sed in laoreet augue. Donec aliquet, elit eget tincidunt posuere, neque orci commodo nisl, id malesuada augue diam vel dui. Morbi sed diam vel sem vehicula feugiat. Nullam varius tempus consequat. Proin consequat rhoncus elit, id efficitur velit pulvinar sed. Integer malesuada mi eget arcu ullamcorper gravida a ac ante. ",
        no_ingredients: 10,
        minutes: 5,
        calories: 120,
        ingredients: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada quis massa luctus condimentum. Curabitur elementum ut risus at iaculis. Mauris quis pretium purus. Maecenas at quam nibh. Phasellus mollis, lectus et rutrum ullamcorper, elit tortor sodales tortor, sit amet dignissim nisl est vel mauris. Nulla odio quam, varius eget pulvinar a, pharetra a neque. Donec metus est, pulvinar a lacinia nec, pulvinar ut massa. Vivamus tempor eros id risus aliquam, vitae vehicula lacus condimentum. Sed in laoreet augue. Donec aliquet, elit eget tincidunt posuere, neque orci commodo nisl, id malesuada augue diam vel dui. Morbi sed diam vel sem vehicula feugiat. Nullam varius tempus consequat. Proin consequat rhoncus elit, id efficitur velit pulvinar sed. Integer malesuada mi eget arcu ullamcorper gravida a ac ante. ",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada quis massa luctus condimentum. Curabitur elementum ut risus at iaculis. Mauris quis pretium purus. Maecenas at quam nibh. Phasellus mollis, lectus et rutrum ullamcorper, elit tortor sodales tortor, sit amet dignissim nisl est vel mauris. Nulla odio quam, varius eget pulvinar a, pharetra a neque. Donec metus est, pulvinar a lacinia nec, pulvinar ut massa. Vivamus tempor eros id risus aliquam, vitae vehicula lacus condimentum. Sed in laoreet augue. Donec aliquet, elit eget tincidunt posuere, neque orci commodo nisl, id malesuada augue diam vel dui. Morbi sed diam vel sem vehicula feugiat. Nullam varius tempus consequat. Proin consequat rhoncus elit, id efficitur velit pulvinar sed. Integer malesuada mi eget arcu ullamcorper gravida a ac ante. ",
        isFeatured: true
    })

    const savedRecipe = await newRecipe.save();

    res.json({
        savedRecipe,
        savedRecipe2,
        savedRecipe3,
        savedRecipe4,
    })
})

app.get('/all-recipes', async (req, res) => {
    const recipes = await recipeSchema.find({})
    if (!recipes) return res.status(404).json({ state: false })
    res.status(200).json({
        recipes
    })
})


app.get('/get-recipe/:id', async (req, res) => {
    const { id } = req.params;
    const recipes = await recipeSchema.find({ _id: id })
    if (!recipes) return res.status(404).json({ state: false })
    res.status(200).json({
        recipe: recipes
    })
})

app.get('/get-recipe-slug/:slug', async (req, res) => {
    const { slug } = req.params;
    const recipes = await recipeSchema.find({ slug: slug })
    if (!recipes) return res.status(404).json({ state: false })
    res.status(200).json({
        recipe: recipes
    })
})



app.get('/recipe-from-category/:category', async (req, res) => {
    const { category } = req.params;
    const recipes = await recipeSchema.find({ category: category })
    if (!recipes) return res.status(404).json({ state: false })
    res.status(200).json({
        recipe: recipes
    })
})


app.get('/category-data/:category', async (req, res) => {
    const { category } = req.params;
    const cat = await categorySchema.find({ name: category })
    if (!cat) return res.status(404).json({ state: false })
    res.status(200).json({
        category: cat
    })
})


app.get('/get-all-category', async (req, res) => {
    const categories = await categorySchema.find({})
    if (!categories) return res.status(404).json({ state: false })
    res.status(200).json({
        categories
    })
})



app.listen(process.env.PORT, () => {
    console.log(`[SERVER] Server started on: ${process.env.PORT}`);
})
