const express = require('express');
const db = require('./config/db');
const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 5000;

// app.ue((req, res, next) => {
//     console.log('Middleware');
//     console.log('Request Received: ', req);
//     next();
// });

// Connect to MongoDB
db.connectMongoDB();

app.use(express.json()) 

app.get('/', (req, res) => {
    res.send({
        success: "true",
        statusCode: 200,
        message: "Sucess! API POINT IS HIT"
    });
});

// Add Routes
routes.forEach(routes => {
    app.use(routes.path, routes.req);
});

app.listen(PORT, (err, succ) => {
    if (err) {
        console.log('Err: ', err);
    }
    console.log('Server runing on ' + PORT);
}
);