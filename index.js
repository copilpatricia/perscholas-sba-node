const express = require('express');
const firstMiddleware = require('./middlewares/firstMiddleware');
const secondMiddleware = require('./middlewares/secondMiddleware');
const users = require('./routes/users');
const products = require('./routes/products');
const reviews = require('./routes/reviews')
const app = express();
const port = 3000;

// middlewares
app.use(firstMiddleware);
app.use(secondMiddleware);

//routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/reviews", reviews);


app.get("/", (req, res) => {
    res.send("pati sdsvdv cdxvcd")
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
  
