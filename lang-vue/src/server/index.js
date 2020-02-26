const express = require('express');
const cors = require('cors');
const graphHTTP = require('express-graphql');
const mysql = require('mysql2');

const PORT = 4000;
const schema = require('./schema');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lang_vue',
});

const app = express();
app.use(cors());

app.use('/graphql', graphHTTP({
  schema,
  graphiql: true,
}));


connection.on('error', (err) => {
  console.log('[mysql error]', err);
});

app.listen(PORT, () => {
  console.log(`PM app is listening on port ${PORT}`);
});
