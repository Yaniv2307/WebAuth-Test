const express = require('express');
//const bodyParser
const routes = require('./routes/routes');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

// a comment from test1 branch + extra addition
// another comment from test2 branch
