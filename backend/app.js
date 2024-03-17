const express =require('express');
const cookieParser=require('cookie-parser');
const app =express();
const cors = require('cors');

app.use(express.json()); 
app.use(cookieParser());
const products=require('./routes/product')
const auth=require('./routes/auth')



app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use('/api/v1',products)
app.use('/api/v1',auth)


module.exports=app;