const connectToMongo = require('./db');
const express = require('express');
const app = express();
connectToMongo();

app.use(express.json());
//available routes
app.get('/',(req,res)=>{
    res.send('hello peter')
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(3500,()=>{
    console.log('working on port 3500');
})
