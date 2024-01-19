const express = require("express");

const app = express();
const {router} = require("./Routes/index");
require("dotenv").config();


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });
app.use("/", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

