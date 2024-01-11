const express = require('express');

const firstMiddleware = require('./middlewares/firstMiddleware');
const secondMiddleware = require('./middlewares/secondMiddleware');

const users = require('./routes/users');
const products = require('./routes/products');
const reviews = require('./routes/reviews');
const error = require("./utilities/error")

const app = express();
const port = 3000;


//BEFORE ANY ROUTES!!- middlewares
//look for any data in the request.body
app.use(express.json());
//looks for any data in the url
app.use(express.urlencoded({ extended: true }));
//

// middlewares
app.use(firstMiddleware);
app.use(secondMiddleware);

//routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/reviews", reviews);


app.get("/", (req, res) => {
    res.send("pati sdsvdv cdxvcd")
});


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
  
