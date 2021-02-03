const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 4000;
const HOST = '0.0.0.0';

const db = require('./db.js')
const config = require('./libs/config.js')
const ANOTHER_URL = `http://${process.env.DOCKERHOST}:7000`;

app.set('dir', path.join(__dirname))

app.use('/db', db);


app.get('/', (req, res) => {
    console.log("server 1 running");
    res.status(200).end();
});

app.get('/close', (req, res) => {
  console.log("closing db");
  db.close();
  res.status(200).end();
});

app.get('/test1', async (req, res) =>{
    console.log('server2: test1 - 1');
    var data = " ";
    var config = {
      method: "get",
      url: `${ANOTHER_URL}/test1`,
      headers: {},
      data: data,
    };
    axios(config)
      .then((response) => {
        console.log("server2: test1 - 2")
        console.log("server2: response OK")
        res.status(200).end();
      })
      .catch((error) => {
        console.error(error.response);
        res.status(500).send(error).end();
      })  
});

app.listen(PORT, HOST, () => {
  console.log(`server1 running on http://${HOST}:${PORT}`)
});
  
