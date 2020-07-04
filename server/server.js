import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import data from './data';
import config from './config';
import userRoute from './routes/userRoute';

dotenv.config();

const app = express();
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(err => console.log( err.reason ));


app.use("/api/users", userRoute);


app.get("/api/products/:id",(req, res)=>{
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId); 
    if(product)
        res.send(product);
    else
        res.status(404).send({msg: "Product NOT Found!"})
});

app.get("/api/products",(req, res)=>{
    res.send(data.products);
});

app.listen(5000, ()=> {console.log("Server started at http://localhost:5000")});