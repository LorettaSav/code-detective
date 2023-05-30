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

// POST NEW CODE SNIPPET
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
  //console.log(question_id)
  const { input } = req.body; //this needs to match the Front End (see Compiler.jsx the sendAttempt function)
  
     try {
      const context = {results: []}; // Create a new context object for the VM execution
      
      vm.createContext(context);
      const results = await db(`SELECT * FROM snippets where id = ${question_id};`)
 
      const tests = results.data[0].tests; 
      
      // Execute the code and capture the result
      vm.runInNewContext(input + tests, context);
      
      //.every() returns true or false if all elements of array match the condition
      if (context.results.every((r) => r)) {
        res.send({ message: "your code passes all tests!"});
      } else {
        res.send({ message: "sorry, try again!" });
      }
     } catch (error) {
       //console.log(error)

       //capturing the error in an object to be able to use in FE
       res.send({message: error.message})
    }
  
});

module.exports = router;
