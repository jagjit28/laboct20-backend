const mongoose = require('mongoose')
const shoppingListSchema = mongoose.Schema(
    {
        item:{
            type : String,
            required : [true, "please enter item"]
        },
    },
    {
        timestamps : true
    }
)
const shoppingList = mongoose.model('shoppingList', shoppingListSchema);
module.exports = shoppingList;
