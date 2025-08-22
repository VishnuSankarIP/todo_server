require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes=require("./src/router/userRoute")
const todoRoutes=require("./src/router/todoRoute")

const app = express();
require('./src/db/connection')

app.use(cors({
    origin: "http://localhost:5173",   
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/todos', todoRoutes);


const PORT=8000 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`Project server started at PORT ${PORT}`);
})

app.get("/",(req,res)=>{
    res.status(200).send(`<h1>Project started and waiting for client request</h1>`)
})