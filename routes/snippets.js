let express = require("express");
let router = express.Router();
const db = require("../model/helper");
const vm = require("node:vm");
const snippetMustExist = require("../middleware/snippetMustExist");


/* GET code snippets for game. */
router.get("/", async function (req, res, next) {
  try {
    const data = await db(`SELECT * FROM snippets;`);
    res.send(data.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET random code snippets by level difficulty
router.get("/level/:level_id", async function (req, res, next) {
  const { level_id } = req.params;
  try {
    const data = await db(
      `SELECT * FROM snippets WHERE level = ${level_id} ORDER BY RAND();`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET snippets based on id
router.get("/:snippet_id", async function (req, res, next) {
  const { snippet_id } = req.params;
  try {
    const data = await db(
      `SELECT * FROM snippets WHERE id = ${snippet_id};`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// INSERTING NEW CODE SNIPPET
router.post("/", async function (req, res, next) {
  const { code, tests, level } = req.body;

  try {
    await db(
      `INSERT INTO snippets (code, tests, level) VALUES ('${code}', '${tests}', ${level});`
    );
    res.send({ msg: "success" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// VM MODULE for getting code written by user.
// ATTEMPTING TO RUN CODE WITH TESTS
router.post("/attempt/:question_id", async function (req, res, next) {
  
  const { question_id } = req.params;
  console.log(question_id)
  // const context = { results: [] };
  // vm.createContext(context);
  // const { code } = req.body;

  // const results = await db(`SELECT * FROM snippets WHERE id = ${question_id};`);
  // const tests = results.data[0].tests;

  // vm.runInContext(code + tests, context);

  // if (context.results.every((r) => r)) {
  //   res.send("your code passes all tests!");
  // } else {
  //   res.send("sorry, try again!");
  // }
  const { code } = req.body;
  
    try {
      const context = {results: []}; // Create a new context object for the VM execution
      
      vm.createContext(context);
      const results = await db(`SELECT * FROM snippets where id = ${question_id};`)
      //res.send(results);//{error: 'result is not defined'}
      /* { data: Array(1), error: null}
        data: Array(1)
        0 :  {id: 7, code: '\nfunction isEven(n) {\n return 1\n\n}', level: 1, 
        tests: '\nresults.push(isEven(1) === 1)'}
        length: 1
        [[Prototype]]: Array(0)
        error: null */
      const tests = results.data[0].tests; 
      //data.tests-->undefined + crash code: 'ERR_HTTP_HEADERS_SENT' but not when result below
      const result = vm.runInNewContext(code + tests, context); // Execute the code and capture the result
      //res.send(result) //ERROR. resultsundefined not defined/ isEven not defined (results AND result is undefined)
      
      
      if (context.results.every((r) => r)) {
        res.send("your code passes all tests!");
      } else {
        res.send("sorry, try again!");
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  
});

//TESTING
//ummm do i need to add stuff to database.js?
// router.get("/test", async function (req, res,next){
//   try {
//     const data = await db(`SELECT * FROM test`);
//     res.send(data) 
//   }catch(err){
//     console.log(err)
//   }
// })

// router.post("/test/attempt/:id", async function (req, res, next) {
//   const { id } = req.params;
//   const context = { results: [] };
//   vm.createContext(context);
//   const { code } = req.body;
//   // const { id } = req.params;

//   const results = await db(`SELECT * FROM test WHERE id = ${id};`);
//   const tests = results.data[0].tests;

//   // QUESTION: how to get specific id for testing and
//   // then HOW to test? get id/ get tests but then the results?
//   // As they are?

//   vm.runInContext(code + tests, context);

//   if (context.results.every((r) => r)) {
//     res.send("your code passes all tests!");
//   } else {
//     res.send("try again");
//   }
// });
module.exports = router;
