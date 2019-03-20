const express = require('express');
const fs = require('fs');

const router = express.Router();

// a test
router.post('/', (req, res) => {
  // const name = req.body.name;
  const name = req.query.name;
  let content = '';
  fs.readFile('./file.txt', 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }
    content = data;

    if (name == 'John') {
      res.json(`Hello John, your file content -  ${content}`);
    } else {
      res.json('Hello World');
    }
  });
});

module.exports = router;

var content;
// First I want to read the file
fs.readFile('./file.txt', function read(err, data) {
  if (err) {
    throw err;
  }
  content = data;

  console.log(content);
});
