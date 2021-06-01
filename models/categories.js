const mongoose = require('mongoose');
module.exports = mongoose.model('categorystore', new mongoose.Schema({
    name: String,
    description: String
}))