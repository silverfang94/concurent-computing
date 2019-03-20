const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

//express
const app = express();

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

//routes
app.use('/', routes.connect);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.json({ err });
});

app.listen(8080, () => console.log(`Example app listening on port 8080!`));
