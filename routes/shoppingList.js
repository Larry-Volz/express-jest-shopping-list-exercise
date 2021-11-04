const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError") 
const items = require("../fakeDb")

router.get("/", function(req, res){
    res.json({items})
  })
  

router.post("/", function (req, res) {
  //TESTING
  console.log(`New item: ${req.body.name}, New price ${req.body.price}`)

  const newItem = { name: req.body.name, price: req.body.price }
  items.push(newItem)
  res.status(201).json({ item: newItem })
})


module.exports = router;