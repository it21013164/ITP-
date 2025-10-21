const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    recipeId : {type:String,required:true},
    title : {type:String,required:true},
    imageUrl : {type:String,required:true},
});

module.exports = mongoose.model('Recipe',recipeSchema);