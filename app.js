require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const ShoppingList = require('./models/shoppingListModels')
const app = express();
var cors = require('cors')

app.use(express.json());
app.use(cors())
// res.header( "Access-Control-Allow-Origin" );

app.get('/getList', async(req, res) => {
try {
  const shoppingList = await ShoppingList.find({})
  return res.status(200).json(shoppingList)
} catch (error) {
  console.log(error.message)
  return res.status(500).json({message:error.message})
}
})

app.post('/addItem',async(req,res)=>{
  try {
    // Get Item input
    const { item } = req.body;
    console.log(item);
    // Validate Item input
    if (!(item)) {
      return res.status(400).send("Input is required");
    }

    // check if Item already exist
    // Validate if Item exist in our database
    const oldItem = await ShoppingList.findOne({ item });

    if (oldItem) {
      return res.status(409).send("Item Already Exist. Please Try Again");
    }

    // Add Item in our database
    const shoppingList = await ShoppingList.create({
      item
    });

    // return new list
    return res.status(201).json("Item Added");
  } catch (err) {
    console.log(err);
  }
})

module.exports = app;