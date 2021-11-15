import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import orderRouter from './routers/orderRouter.js';


dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));

const db =  mongoose.connect('mongodb://localhost:27017/amazona',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
db.then(()=> console.log('Db Connected')).catch(err => console.log(err))



// app.get('/api/products',(req,res)=>{
//     res.send(data.products);
// })

app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})
app.get('/',(req,res)=>{
    res.send('working')
})


app.use((err,req,res,next)=>{
    const {statusCode,message} = err;
    if (!statusCode) err.statusCode = 500;
    
    return res.status(statusCode).json({
        status:"error",
        statusCode,
        message
    })

   
    // const handleError = (err, res) => {
    //     const { statusCode, message } = err;
    //     res.status(statusCode).json({
    //       status: "error",
    //       statusCode,
    //       message
    //     });
    //   };



    //handleError(err,res);
})


const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`SErver is running or port ${port}`))

