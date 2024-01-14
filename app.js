require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 5001;
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const db = require("./models");
const fs = require('fs')
// routes
const routes = require("./routes");
const { initSocket } = require("./utils/socket");
initSocket(server);

// server static images folder
app.use('/image', express.static('image'))

// body parser
// const bodyParser = express.json();
// app.use(bodyParser);
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cors
app.use(cors());

// create image folder
function createFolder() {
  const folderName = 'image';

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`Folder '${folderName}' created successfully.`);
  } else {
    console.log(`Folder '${folderName}' already exists.`);
  }
}

createFolder();

app.use("/api", routes);

// listen
server.listen(PORT, () => {
  console.log(` app listening at http://localhost:${PORT}`);
});
