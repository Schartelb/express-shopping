const express = require('express')
const app = express();
const itemRoutes = require('./itemroutes')


app.use(express.json());

app.use("/items",itemRoutes);


module.exports = app;