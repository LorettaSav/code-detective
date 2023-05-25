let express = require("express");
let router = express.Router();
const db = require("../model/helper");
const vm = require("node:vm");

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
router.get("/", async function (req, res, next) {
  try {
    const data = await db(`SELECT * FROM snippets;`);
    res.send(data.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET random code snippets
router.get("/levels/:level_id", async function (req, res, next) {
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
// ATTMPTING TO RUN CODE WITH TESTS
router.post("/attempt/:question_id", async function (req, res, next) {
  const { question_id } = req.params;
  const context = { results: [] };
  vm.createContext(context);
  const { code } = req.body;
  // const { id } = req.params;

  const results = await db(`SELECT * FROM snippets WHERE id = ${question_id};`);
  const tests = results.data[0].tests;

  // QUESTION: how to get specific id for testing and
  // then HOW to test? get id/ get tests but then the results?
  // As they are?

  vm.runInContext(code + tests, context);

  if (context.results.every((r) => r)) {
    res.send("your code passes all tests!");
  } else {
    res.send("try again");
  }
});

module.exports = router;
