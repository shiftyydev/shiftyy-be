require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 5001;

// body parser
const bodyParser = express.json();
app.use(bodyParser);

// cors
const cors = require("cors");
app.use(cors());

const db = require("./models").sequelize.sync({ force: false, alter: true }).then(() => {
  console.log('Resync Db');
});


// routes
const routes = require("./routes");
app.use("/api", routes);

// listen
app.listen(PORT, () => {
  console.log(` app listening at http://localhost:${PORT}`);
});
