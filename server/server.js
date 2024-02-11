const express = require("express");
const mongoose = require("mongoose");

const Restaurant = require("./models/restaurantModel");

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/restaurantsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/restaurant", async (req, res) =>{
    try{
        const restaurants = await Restaurant.find({})
        res.json(restaurants)
    }catch(err){
        console.log(err)
    }
})

app.post("/restaurant", async (req, res) =>{
  const {newRate, id} = req.body;
  
  try{
      const restaurants = await Restaurant.findOne({id})
      const updated = await Restaurant.updateOne(
        {_id: restaurants._id},
        {$set: {"rating": newRate}}
      )
      console.log(updated)
      res.json(restaurants)
  }catch(err){
      console.log(err)
  }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});