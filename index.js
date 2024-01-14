const express = require("express");

const firstMiddleware = require("./middlewares/firstMiddleware");
const secondMiddleware = require("./middlewares/secondMiddleware");

const users = require("./routes/users");
const products = require("./routes/products");
const reviews = require("./routes/reviews");
const error = require("./utilities/error");

const app = express();
const port = 3000;

// register view engine - views default folder where the ejs will look
app.set("view engine", "ejs");

//BEFORE ANY ROUTES!!- middlewares
//look for any data in the request.body
app.use(express.json());
//looks for any data in the url
app.use(express.urlencoded({ extended: true }));
//

// middlewares
app.use(firstMiddleware);
app.use(secondMiddleware);

//styles
app.use(express.static("./styles"));

//routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/reviews", reviews);

app.get("/", (req, res) => {
  res.send("pati");
});

app.get("/form", (req, res) => {
  res.render("form", {
    fname: "First Name",
    lname: "Last Name",
    btn: "Sign in",
  });
});

// interaction between the form and the RESTful API
app.post("/form/message", (req, res) => {
  res.json({ message: "Your form interacted with your RESTful API" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
