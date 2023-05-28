const db = require("../model/helper");

async function snippetMustExist(req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(`SELECT * FROM snippets WHERE id = ${id}`);
    if (results.data.length) {
      next();
    } else {
      res.status(404).send({ message: "Snippet not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = snippetMustExist;