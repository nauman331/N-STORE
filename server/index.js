const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const connectDB = require("./helpers/connectDB")
const userroutes = require("./routes/userroutes")
const adminroutes = require("./routes/adminroutes")

corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD"
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/user', userroutes);
app.use('/api/admin', adminroutes);

connectDB().then(()=>{
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})})