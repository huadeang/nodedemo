const express = require('express');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/users/:id', (req, res) => {
    const username = req.params.id//'huadeang';
    const url = `https://api.github.com/users/${username}`;

    console.log('get profile ');


    // res.json({
    //     message: 'Caching state not ready',
    // });
    console.log('Cache not ready. Loding data from API');
    fetch(url).then((response) => {

        return response.json();
    }).then((myJson) => {
        console.log('Response from API');
        //console.log(myJson);
        // set แบบมี expire ด้วย (เก็บไว้ 60วินาที)
        //redisClient.setex(username, 60, JSON.stringify(myJson));
        //redisClient.set(username, JSON.stringify(myJson));
        res.json(myJson);
    }).catch((error) => {
        console.log('Fetch from api error ' + error);
    });
});


app.listen(port, () => {
    console.log('App is running on port ' + port);
});