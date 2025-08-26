// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', todoRoutes);

app.get('/',(req,res)=>{
    res.send("Your server is running")
})
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
