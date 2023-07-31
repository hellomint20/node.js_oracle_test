const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
const router = require("./src/routers/router.js")(app);     //각각의 router 를 설정하기 위해 넘겨줌

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use("/", router);

app.listen(3000, (() => { console.log("member server success~~"); }));