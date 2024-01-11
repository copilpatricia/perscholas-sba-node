const express = require('express');
const firstMiddleware = require('./middlewares/firstMiddleware');
const secondMiddleware = require('./middlewares/secondMiddleware')

const app = express();
const port = 3000;

// middlewares
app.use(firstMiddleware);
app.use(secondMiddleware);


app.get("/", (req, res) => {
    res.send("pati sdsvdv cdxvcd")
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
  
