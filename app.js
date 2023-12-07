require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 5001;
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const db = require("./models")
// routes
const routes = require("./routes");
const { initSocket } = require("./utils/socket");
initSocket(server);
// body parser
const bodyParser = express.json();
app.use(bodyParser);

// cors
app.use(cors());



app.use("/api", routes);

// listen
server.listen(PORT, () => {
  console.log(` app listening at http://localhost:${PORT}`);
});
