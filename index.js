const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const eventRoute = require("./routes/events");
const inviteRoute = require("./routes/invite");
const inviteManagerRoute = require("./routes/inviteManager");

dotenv.config();


app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

app.use("/api/events", eventRoute);
app.use("/api/invites", inviteRoute);
app.use("/api/invManagers", inviteManagerRoute);


app.listen(8800, () => {
  console.log("Backend server is running!");
});

