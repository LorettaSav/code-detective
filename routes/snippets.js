
let express = require("express");
let router = express.Router();
const db = require("../model/helper");
//const vm = require("node:vm");

/*
const tests = [{
  id: 1,
  test1: " isEven(4) === 'its even' ",
  test2: " isEven(395) === 'its not even' "
},
{
  id: 2;
  test1: " const arr = [2,3,4,5,6];
  findEven(arr);
  // [2,4,6]
  "
}
]

*/


/* GET code snippets for game. */
router.get('/', async function(req, res, next) {
  try {
    const data = await db(`SELECT * FROM snippets;`);
    res.send(data.data);
  }catch(err) {
    res.status(500).send(err)
  }
});

// GET random code snippets
router.get('/levels/:level_id' , async function(req, res, next) {
 const {level_id} = req.params; 
  try{
    const data = await db(`SELECT * FROM snippets WHERE level = ${level_id} ORDER BY RAND();`);
    res.send(data.data);
  }catch(err){
    res.status(500).send(err)
  }
})

/*VM MODULE for getting code written by user.
 router.post("/", function(req, res, next){
  const context = {};
  vm.createContext(context);
  const { code } = req.body;
  const { id } = req.params;

  QUESTION: how to get specific id for testing and
  then HOW to test? get id/ get tests but then the results?
  As they are?

  vm.runInContext( code + findTest, context);


 }) */

module.exports = router;
