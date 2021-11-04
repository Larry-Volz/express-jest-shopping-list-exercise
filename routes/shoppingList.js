const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError") 
const items = require("../fakeDb")

router.get("/", function(req, res){
  /** GET general list */
    res.json({items})
  })
  

router.post("/", function (req, res) {
  /**POST ADD a new item */
  console.log(`from POST request: name = ${req.body.name}`)
  const newItem = { name: req.body.name, price: req.body.price }
  items.push(newItem)
  res.status(201).json({ item: newItem })
})


router.get("/:name", function (req, res) {
  /** SHOW one item found by name*/
  const foundItem = items.find(item => item.name === req.params.name)
  if(foundItem === undefined){
    throw new ExpressError("item not found", 404)
  }
  res.json({ item: foundItem })
})

router.patch("/:name", function (req, res) {
  /** PATCH -> RENAME one item */
  const foundItem = items.find(item => item.name === req.params.name)
  if (foundItem === undefined) {
    throw new ExpressError("item not found", 404)
  }
  foundItem.name = req.body.name 
  res.json({ item: foundItem })
})

router.delete("/:name", function (req, res) {
  /**delete an item */
  const foundItem = items.findIndex(item => item.name === req.params.name)
  console.log("param INDEX:", foundItem)
  if (foundItem === -1) {
    throw new ExpressError("item not found", 404)
  }
  items.splice(foundItem, 1)
  res.json({ message: "Deleted" })
})

module.exports = router;