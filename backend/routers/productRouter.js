import express from 'express';
import data from '../data.js';
import Products from '../models/productSchema.js';
import BadRequestError from '../utility/error.js';

const productRouter = express.Router();

productRouter.get('/',async (req,res,next)=>{

    try{
        const products = await Products.find({});
        if(!products){
            throw new BadRequestError(404,'Products Not Found' )
            return;
        }
        res.send({products});
    }catch(error){
        error.statusCode = 500;
        next(error);
    }
    

})


productRouter.get('/seed',async (req,res,next)=>{

    try{
        const createdProducts = await Products.insertMany(data.products);
        res.send({createdProducts});
    }catch(error){
        error.statusCode = 500;
        next(error);
    }
    

})

productRouter.get('/:id',async (req,res,next)=>{
    //req.params.id
    try{
        const product = await Products.findById(req.params.id);
        if(!product){
            throw new BadRequestError(404,'Product Not Found');
            return;
        }
        res.send({product});
    }catch(error){
        error.statusCode = 404;
        error.message = 'Product not Found';
        next(error);
    }

})
export default  productRouter; 
