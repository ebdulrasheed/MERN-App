const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send({
        success: "true",
        statusCode: 200,
        message: "Sucess! API POINT IS HIT"
    });
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, (err, succ) => {
    if (err) {
        console.log('Err: ', err);
    }
    console.log('Server runing on ' + PORT);
}
);